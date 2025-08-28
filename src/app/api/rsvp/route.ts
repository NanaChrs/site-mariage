import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

interface RsvpData {
  name: string;
  firstname: string;
  email: string;
  phone?: string | null;
  age?: number | null;
  diet?: string | null;
  comment?: string | null;
  isComing: boolean;
}

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validation des champs requis
    if (!body.name || !body.firstname) {
      return NextResponse.json(
        { error: 'Les champs nom et prénom sont obligatoires' },
        { status: 400 }
      );
    }

    // Validation de l'email pour la personne principale (non-accompagnant)
    if (!body.email || (!body.email.includes('@accompagnant.temp') && !body.email.includes('@'))) {
      return NextResponse.json(
        { error: 'L\'adresse email est obligatoire et doit être valide' },
        { status: 400 }
      );
    }

    const {
      name,
      firstname,
      email,
      phone,
      age,
      diet,
      comment,
      isComing
    }: RsvpData = body;

    // Vérification si l'email existe déjà (sauf pour les accompagnants temporaires)
    if (!email.includes('@accompagnant.temp')) {
      const existingUser = await sql`
        SELECT id FROM people WHERE email = ${email}
      `;

      if (existingUser.length > 0) {
        return NextResponse.json(
          { error: 'Cette adresse email est déjà enregistrée' },
          { status: 409 }
        );
      }
    }

    // Insertion dans la base de données
    const result = await sql`
      INSERT INTO people (name, firstname, email, phone, age, diet, comment, "isComing")
      VALUES (${name}, ${firstname}, ${email}, ${phone || null}, ${age || null}, ${diet || null}, ${comment || null}, ${isComing})
      RETURNING id
    `;

    const insertedId = result[0]?.id;

    return NextResponse.json(
      {
        message: 'RSVP enregistré avec succès',
        id: insertedId,
        person: {
          name,
          firstname,
          email: email.includes('@accompagnant.temp') ? 'Accompagnant' : email,
          isComing
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Erreur lors de l\'enregistrement RSVP:', error);

    // Gestion des erreurs spécifiques de la base de données
    if (error instanceof Error) {
      if (error.message.includes('unique constraint')) {
        return NextResponse.json(
          { error: 'Cette information est déjà enregistrée' },
          { status: 409 }
        );
      }

      if (error.message.includes('does not exist')) {
        return NextResponse.json(
          { error: 'Erreur de configuration de la base de données' },
          { status: 500 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
