const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Crear o abrir la base de datos
const dbPath = path.join(__dirname, 'portfolio.db');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error al conectar con la base de datos:', err);
    } else {
        console.log('✅ Conectado a la base de datos SQLite');
        initializeDatabase();
    }
});

// Inicializar las tablas
function initializeDatabase() {
    // Tabla de testimonios
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
    `, (err) => {
        if (err) {
            console.error('Error al crear tabla testimonials:', err);
        } else {
            console.log('✅ Tabla testimonials lista');
        }
    });

    // Tabla de mensajes de contacto
    db.run(`
        CREATE TABLE IF NOT EXISTS contact_messages (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            read BOOLEAN DEFAULT 0
        )
    `, (err) => {
        if (err) {
            console.error('Error al crear tabla contact_messages:', err);
        } else {
            console.log('✅ Tabla contact_messages lista');
        }
    });

    // Insertar testimonios de ejemplo si la tabla está vacía
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

// Funciones para testimonios
const testimonials = {
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

// Funciones para mensajes de contacto
const contactMessages = {
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

module.exports = {
    db,
    testimonials,
    contactMessages
};
