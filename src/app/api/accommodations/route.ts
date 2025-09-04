import { NextResponse } from 'next/server';
import { neon } from '@neondatabase/serverless';

type Accommodation = {
    name: string;
    travel_time_in_minutes: number;
    url: string;
    image_url: string;
    number_of_person: number;
    price_per_night: number;
}

const sql = neon(process.env.DATABASE_URL!);

export async function GET() {
    try {

        const result: Accommodation[] = await sql`
            SELECT
                *, (price_per_night/number_of_person) as price_per_night_per_person
            FROM accommodation
            ORDER BY travel_time_in_minutes ASC, price_per_night_per_person ASC
        ` as Accommodation[];

        return NextResponse.json(
            result,
            { status: 201 }
        );

    } catch (error) {
        console.error('Erreur lors de la récupération des logements:', error);

        return NextResponse.json(
            { error: 'Erreur interne du serveur' },
            { status: 500 }
        );
    }
}
