-- Import existing event and team content into Supabase.
-- Safe to run multiple times.

INSERT INTO public.events
(title, slug, description, date, location)
SELECT
    seed.title,
    seed.slug,
    seed.description,
    seed.event_date::date,
    seed.location
FROM (
    VALUES
        (
            'Hack Demo Defend',
            'hack-demo-defend',
            'A technical event focused on building, demonstrating, and defending innovative ideas.',
            '2026-02-27',
            'Technical'
        ),
        (
            'Think Tank Ideathon',
            'think-tank-ideathon',
            'A collaborative ideathon for developing creative technology-driven solutions.',
            '2026-02-27',
            'Technical'
        ),
        (
            'VIBE.EXE Workshop',
            'vibe-exe-workshop',
            'A hands-on technical workshop for exploring practical tools and emerging ideas.',
            '2026-02-27',
            'Technical'
        ),
        (
            'Skill Hunt',
            'skill-hunt',
            'A challenge designed to discover and celebrate the diverse skills of the chapter.',
            '2026-06-13',
            'Non-Technical'
        ),
        (
            'Informatyka 6.O Object Quest',
            'informatyka-6-o-object-quest',
            'A technical quest built around problem-solving, exploration, and computing concepts.',
            '2026-06-28',
            'Technical'
        ),
        (
            'Blueprint to Breakthrough',
            'blueprint-to-breakthrough',
            'A technical event that turns structured plans into useful breakthroughs.',
            '2026-07-04',
            'Technical'
        ),
        (
            'Informatyka 6.O Prompt to Meme',
            'informatyka-6-o-prompt-to-meme',
            'A creative challenge that transforms prompts into engaging memes.',
            '2026-07-12',
            'Non-Technical'
        ),
        (
            'MD Session, CS',
            'md-session-cs',
            'A chapter session focused on sharing knowledge and connecting the community.',
            '2026-08-16',
            'MD'
        )
) AS seed(title, slug, description, event_date, location)
WHERE NOT EXISTS (
    SELECT 1
    FROM public.events existing
    WHERE existing.slug = seed.slug
);


INSERT INTO public.team_members
(name, position, display_order)
SELECT
    seed.name,
    seed.position,
    seed.display_order
FROM (
    VALUES
        ('Eldhose P.SIM', 'Chapter Advisor', 0),
        ('Syno Shaji Kurian', 'Chair', 1),
        ('Neswin Easter', 'Vice Chair', 2),
        ('Alen Basil', 'Secretary', 3),
        ('Manna Elsa Thomas', 'Treasurer', 4),
        ('Nadir K Muhammed Shafi', 'Web Master', 5),
        ('Grace Mary Eldo', 'WICS', 6)
) AS seed(name, position, display_order)
WHERE NOT EXISTS (
    SELECT 1
    FROM public.team_members existing
    WHERE existing.name = seed.name
      AND existing.position = seed.position
);