require('dotenv').config();

// Detectar si estamos en producción con base de datos configurada
const hasDatabase = process.env.DATABASE_URL;
const isProduction = process.env.VERCEL && hasDatabase;

let db;
let testimonials;
let contactMessages;

// Datos estáticos para cuando no hay base de datos
const staticTestimonials = [
    {
        id: 1,
        name: 'María Contreras',
        position: 'CEO, Luxe Brand',
        message: 'Un trabajo excepcional. La identidad visual que creó para nuestra marca superó todas nuestras expectativas. Profesional, creativa y muy atenta a los detalles.',
        rating: 5,
        created_at: new Date().toISOString(),
        approved: true
    },
    {
        id: 2,
        name: 'Juan Rodríguez',
        position: 'Director Creativo, Modern Living',
        message: 'Increíble capacidad para entender la visión del proyecto y transformarla en diseños impactantes. El proceso fue fluido y el resultado final fue perfecto.',
        rating: 5,
        created_at: new Date().toISOString(),
        approved: true
    },
    {
        id: 3,
        name: 'Sofía Pérez',
        position: 'Marketing Manager, Green Life',
        message: 'Su talento y profesionalismo son evidentes en cada proyecto. Las ilustraciones que creó para nuestra campaña fueron simplemente espectaculares.',
        rating: 5,
        created_at: new Date().toISOString(),
        approved: true
    }
];

if (isProduction) {
    // ===== NEON POSTGRES (Producción con DB) =====
    const { neon } = require('@neondatabase/serverless');
    const sql = neon(process.env.DATABASE_URL);

    console.log('✅ Usando Neon PostgreSQL (Producción)');

    // Inicializar tablas en PostgreSQL
    async function initializePostgres() {
        try {
            // Tabla de testimonios
            await sql`
                CREATE TABLE IF NOT EXISTS testimonials (
                    id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    position TEXT NOT NULL,
                    message TEXT NOT NULL,
                    rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    approved BOOLEAN DEFAULT true
                )
            `;

            // Tabla de mensajes de contacto
            await sql`
                CREATE TABLE IF NOT EXISTS contact_messages (
                    id SERIAL PRIMARY KEY,
                    name TEXT NOT NULL,
                    email TEXT NOT NULL,
                    message TEXT NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    read BOOLEAN DEFAULT false
                )
            `;

            // Insertar testimonios de ejemplo si está vacío
            const count = await sql`SELECT COUNT(*) as count FROM testimonials WHERE approved = true`;
            if (count[0].count === '0' || count[0].count === 0) {
                await sql`
                    INSERT INTO testimonials (name, position, message, rating, approved) VALUES
                    ('María Contreras', 'CEO, Luxe Brand', 'Un trabajo excepcional. La identidad visual que creó para nuestra marca superó todas nuestras expectativas. Profesional, creativa y muy atenta a los detalles.', 5, true),
                    ('Juan Rodríguez', 'Director Creativo, Modern Living', 'Increíble capacidad para entender la visión del proyecto y transformarla en diseños impactantes. El proceso fue fluido y el resultado final fue perfecto.', 5, true),
                    ('Sofía Pérez', 'Marketing Manager, Green Life', 'Su talento y profesionalismo son evidentes en cada proyecto. Las ilustraciones que creó para nuestra campaña fueron simplemente espectaculares.', 5, true)
                `;
                console.log('✅ Testimonios de ejemplo insertados');
            }

            console.log('✅ Tablas PostgreSQL listas');
        } catch (error) {
            console.error('Error al inicializar PostgreSQL:', error);
        }
    }

    initializePostgres();

    // Funciones para testimonios (PostgreSQL)
    testimonials = {
        getAll: async (callback) => {
            try {
                const rows = await sql`SELECT * FROM testimonials WHERE approved = true ORDER BY created_at DESC`;
                callback(null, rows);
            } catch (err) {
                callback(err);
            }
        },

        getById: async (id, callback) => {
            try {
                const rows = await sql`SELECT * FROM testimonials WHERE id = ${id}`;
                callback(null, rows[0]);
            } catch (err) {
                callback(err);
            }
        },

        create: async (testimonial, callback) => {
            try {
                const { name, position, message, rating } = testimonial;
                const result = await sql`
                    INSERT INTO testimonials (name, position, message, rating, approved)
                    VALUES (${name}, ${position}, ${message}, ${rating}, true)
                    RETURNING id
                `;
                callback(null, result[0].id);
            } catch (err) {
                callback(err);
            }
        },

        approve: async (id, callback) => {
            try {
                await sql`UPDATE testimonials SET approved = true WHERE id = ${id}`;
                callback(null);
            } catch (err) {
                callback(err);
            }
        },

        delete: async (id, callback) => {
            try {
                await sql`DELETE FROM testimonials WHERE id = ${id}`;
                callback(null);
            } catch (err) {
                callback(err);
            }
        }
    };

    // Funciones para mensajes de contacto (PostgreSQL)
    contactMessages = {
        getAll: async (callback) => {
            try {
                const rows = await sql`SELECT * FROM contact_messages ORDER BY created_at DESC`;
                callback(null, rows);
            } catch (err) {
                callback(err);
            }
        },

        getById: async (id, callback) => {
            try {
                const rows = await sql`SELECT * FROM contact_messages WHERE id = ${id}`;
                callback(null, rows[0]);
            } catch (err) {
                callback(err);
            }
        },

        create: async (message, callback) => {
            try {
                const { name, email, message: msg } = message;
                const result = await sql`
                    INSERT INTO contact_messages (name, email, message)
                    VALUES (${name}, ${email}, ${msg})
                    RETURNING id
                `;
                callback(null, result[0].id);
            } catch (err) {
                callback(err);
            }
        },

        markAsRead: async (id, callback) => {
            try {
                await sql`UPDATE contact_messages SET read = true WHERE id = ${id}`;
                callback(null);
            } catch (err) {
                callback(err);
            }
        },

        delete: async (id, callback) => {
            try {
                await sql`DELETE FROM contact_messages WHERE id = ${id}`;
                callback(null);
            } catch (err) {
                callback(err);
            }
        }
    };

} else {
    // ===== SQLITE (Desarrollo local) =====
    const sqlite3 = require('sqlite3').verbose();
    const path = require('path');

    const dbPath = path.join(__dirname, 'portfolio.db');
    db = new sqlite3.Database(dbPath, (err) => {
        if (err) {
            console.error('Error al conectar con la base de datos:', err);
        } else {
            console.log('✅ Conectado a la base de datos SQLite (Desarrollo)');
            initializeSQLite();
        }
    });

    function initializeSQLite() {
        db.run(`
            CREATE TABLE IF NOT EXISTS testimonials (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                position TEXT NOT NULL,
                message TEXT NOT NULL,
                rating INTEGER NOT NULL CHECK(rating >= 1 AND rating <= 5),
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                approved BOOLEAN DEFAULT 0
            )
        `);

        db.run(`
            CREATE TABLE IF NOT EXISTS contact_messages (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                message TEXT NOT NULL,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                read BOOLEAN DEFAULT 0
            )
        `);

        db.get('SELECT COUNT(*) as count FROM testimonials WHERE approved = 1', (err, row) => {
            if (!err && row.count === 0) {
                const sampleTestimonials = [
                    {
                        name: 'María Contreras',
                        position: 'CEO, Luxe Brand',
                        message: 'Un trabajo excepcional. La identidad visual que creó para nuestra marca superó todas nuestras expectativas. Profesional, creativa y muy atenta a los detalles.',
                        rating: 5
                    },
                    {
                        name: 'Juan Rodríguez',
                        position: 'Director Creativo, Modern Living',
                        message: 'Increíble capacidad para entender la visión del proyecto y transformarla en diseños impactantes. El proceso fue fluido y el resultado final fue perfecto.',
                        rating: 5
                    },
                    {
                        name: 'Sofía Pérez',
                        position: 'Marketing Manager, Green Life',
                        message: 'Su talento y profesionalismo son evidentes en cada proyecto. Las ilustraciones que creó para nuestra campaña fueron simplemente espectaculares.',
                        rating: 5
                    }
                ];

                const stmt = db.prepare('INSERT INTO testimonials (name, position, message, rating, approved) VALUES (?, ?, ?, ?, 1)');
                sampleTestimonials.forEach(t => {
                    stmt.run(t.name, t.position, t.message, t.rating);
                });
                stmt.finalize();
                console.log('✅ Testimonios de ejemplo insertados');
            }
        });
    }

    // Funciones para testimonios (SQLite)
    testimonials = {
        getAll: (callback) => {
            db.all('SELECT * FROM testimonials WHERE approved = 1 ORDER BY created_at DESC', callback);
        },

        getById: (id, callback) => {
            db.get('SELECT * FROM testimonials WHERE id = ?', [id], callback);
        },

        create: (testimonial, callback) => {
            const { name, position, message, rating } = testimonial;
            db.run(
                'INSERT INTO testimonials (name, position, message, rating, approved) VALUES (?, ?, ?, ?, 1)',
                [name, position, message, rating],
                function(err) {
                    callback(err, this.lastID);
                }
            );
        },

        approve: (id, callback) => {
            db.run('UPDATE testimonials SET approved = 1 WHERE id = ?', [id], callback);
        },

        delete: (id, callback) => {
            db.run('DELETE FROM testimonials WHERE id = ?', [id], callback);
        }
    };

    // Funciones para mensajes de contacto (SQLite)
    contactMessages = {
        getAll: (callback) => {
            db.all('SELECT * FROM contact_messages ORDER BY created_at DESC', callback);
        },

        getById: (id, callback) => {
            db.get('SELECT * FROM contact_messages WHERE id = ?', [id], callback);
        },

        create: (message, callback) => {
            const { name, email, message: msg } = message;
            db.run(
                'INSERT INTO contact_messages (name, email, message) VALUES (?, ?, ?)',
                [name, email, msg],
                function(err) {
                    callback(err, this.lastID);
                }
            );
        },

        markAsRead: (id, callback) => {
            db.run('UPDATE contact_messages SET read = 1 WHERE id = ?', [id], callback);
        },

        delete: (id, callback) => {
            db.run('DELETE FROM contact_messages WHERE id = ?', [id], callback);
        }
    };
}

// Si no hay base de datos configurada (Vercel sin DATABASE_URL)
if (!isProduction && process.env.VERCEL) {
    console.log('⚠️  Modo sin base de datos (Vercel) - Usando datos estáticos');

    testimonials = {
        getAll: (callback) => {
            callback(null, staticTestimonials);
        },
        getById: (id, callback) => {
            const testimonial = staticTestimonials.find(t => t.id === parseInt(id));
            callback(null, testimonial);
        },
        create: (testimonial, callback) => {
            callback(new Error('Base de datos no configurada'));
        },
        approve: (id, callback) => {
            callback(null);
        },
        delete: (id, callback) => {
            callback(new Error('Base de datos no configurada'));
        }
    };

    contactMessages = {
        getAll: (callback) => {
            callback(null, []);
        },
        getById: (id, callback) => {
            callback(null, null);
        },
        create: (message, callback) => {
            callback(new Error('Base de datos no configurada'));
        },
        markAsRead: (id, callback) => {
            callback(null);
        },
        delete: (id, callback) => {
            callback(new Error('Base de datos no configurada'));
        }
    };
}

module.exports = {
    db,
    testimonials,
    contactMessages
};
