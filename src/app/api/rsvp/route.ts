import { NextRequest, NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, firstname, email, phone, age, diet, comment, isComing } = body;

    if (!name || !firstname || !email) {
      return NextResponse.json(
        { error: 'Les champs nom, prénom et email sont obligatoires' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Format d\'email invalide' },
        { status: 400 }
      );
    }

    const result = await sql`
      INSERT INTO people (name, firstname, email, phone, age, diet, comment, "isComing")
      VALUES (${name}, ${firstname}, ${email}, ${phone || null}, ${age || null}, ${diet || null}, ${comment || null}, ${isComing})
      RETURNING id
    `;

    return NextResponse.json(
      {
        message: 'RSVP enregistré avec succès',
        id: result[0].id
      },
      { status: 201 }
    );

  } catch (error: unknown) {
    console.error('Erreur lors de l\'enregistrement RSVP:', error);
    if (error && typeof error === 'object' && 'code' in error && error.code === '23505') {
      const pgError = error as { constraint?: string };
      if (pgError.constraint?.includes('email')) {
        return NextResponse.json(
          { error: 'Cette adresse email est déjà utilisée' },
          { status: 409 }
        );
      }
      if (pgError.constraint?.includes('phone')) {
        return NextResponse.json(
          { error: 'Ce numéro de téléphone est déjà utilisé' },
          { status: 409 }
        );
      }
    }

    return NextResponse.json(
      { error: 'Erreur interne du serveur' },
      { status: 500 }
    );
  }
}
