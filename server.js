const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const { testimonials, contactMessages } = require('./database');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir archivos estáticos (HTML, CSS, JS, imágenes)
app.use(express.static(path.join(__dirname)));

// Ruta principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ============================================
// RUTAS API - TESTIMONIOS
// ============================================

// Obtener todos los testimonios aprobados
app.get('/api/testimonials', (req, res) => {
    testimonials.getAll((err, rows) => {
        if (err) {
            console.error('Error al obtener testimonios:', err);
            return res.status(500).json({
                error: 'Error al obtener testimonios',
                message: err.message
            });
        }
        res.json({
            success: true,
            data: rows
        });
    });
});

// Obtener un testimonio por ID
app.get('/api/testimonials/:id', (req, res) => {
    const id = req.params.id;
    testimonials.getById(id, (err, row) => {
        if (err) {
            console.error('Error al obtener testimonio:', err);
            return res.status(500).json({
                error: 'Error al obtener testimonio',
                message: err.message
            });
        }
        if (!row) {
            return res.status(404).json({
                error: 'Testimonio no encontrado'
            });
        }
        res.json({
            success: true,
            data: row
        });
    });
});

// Crear un nuevo testimonio
app.post('/api/testimonials', (req, res) => {
    const { name, position, message, rating } = req.body;

    // Validación
    if (!name || !position || !message || !rating) {
        return res.status(400).json({
            error: 'Todos los campos son requeridos',
            required: ['name', 'position', 'message', 'rating']
        });
    }

    if (rating < 1 || rating > 5) {
        return res.status(400).json({
            error: 'La calificación debe estar entre 1 y 5'
        });
    }

    const testimonial = { name, position, message, rating: parseInt(rating) };

    testimonials.create(testimonial, (err, id) => {
        if (err) {
            console.error('Error al crear testimonio:', err);
            return res.status(500).json({
                error: 'Error al crear testimonio',
                message: err.message
            });
        }
        res.status(201).json({
            success: true,
            message: 'Testimonio creado exitosamente',
            data: { id, ...testimonial }
        });
    });
});

// Eliminar un testimonio
app.delete('/api/testimonials/:id', (req, res) => {
    const id = req.params.id;
    testimonials.delete(id, (err) => {
        if (err) {
            console.error('Error al eliminar testimonio:', err);
            return res.status(500).json({
                error: 'Error al eliminar testimonio',
                message: err.message
            });
        }
        res.json({
            success: true,
            message: 'Testimonio eliminado exitosamente'
        });
    });
});

// ============================================
// RUTAS API - MENSAJES DE CONTACTO
// ============================================

// Obtener todos los mensajes de contacto
app.get('/api/contact', (req, res) => {
    contactMessages.getAll((err, rows) => {
        if (err) {
            console.error('Error al obtener mensajes:', err);
            return res.status(500).json({
                error: 'Error al obtener mensajes',
                message: err.message
            });
        }
        res.json({
            success: true,
            data: rows
        });
    });
});

// Obtener un mensaje por ID
app.get('/api/contact/:id', (req, res) => {
    const id = req.params.id;
    contactMessages.getById(id, (err, row) => {
        if (err) {
            console.error('Error al obtener mensaje:', err);
            return res.status(500).json({
                error: 'Error al obtener mensaje',
                message: err.message
            });
        }
        if (!row) {
            return res.status(404).json({
                error: 'Mensaje no encontrado'
            });
        }
        res.json({
            success: true,
            data: row
        });
    });
});

// Crear un nuevo mensaje de contacto
app.post('/api/contact', (req, res) => {
    const { name, email, message } = req.body;

    // Validación
    if (!name || !email || !message) {
        return res.status(400).json({
            error: 'Todos los campos son requeridos',
            required: ['name', 'email', 'message']
        });
    }

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            error: 'El formato del email no es válido'
        });
    }

    const contactMessage = { name, email, message };

    contactMessages.create(contactMessage, (err, id) => {
        if (err) {
            console.error('Error al crear mensaje:', err);
            return res.status(500).json({
                error: 'Error al crear mensaje',
                message: err.message
            });
        }
        res.status(201).json({
            success: true,
            message: 'Mensaje enviado exitosamente',
            data: { id, ...contactMessage }
        });
    });
});

// Marcar mensaje como leído
app.patch('/api/contact/:id/read', (req, res) => {
    const id = req.params.id;
    contactMessages.markAsRead(id, (err) => {
        if (err) {
            console.error('Error al marcar mensaje como leído:', err);
            return res.status(500).json({
                error: 'Error al actualizar mensaje',
                message: err.message
            });
        }
        res.json({
            success: true,
            message: 'Mensaje marcado como leído'
        });
    });
});

// Eliminar un mensaje
app.delete('/api/contact/:id', (req, res) => {
    const id = req.params.id;
    contactMessages.delete(id, (err) => {
        if (err) {
            console.error('Error al eliminar mensaje:', err);
            return res.status(500).json({
                error: 'Error al eliminar mensaje',
                message: err.message
            });
        }
        res.json({
            success: true,
            message: 'Mensaje eliminado exitosamente'
        });
    });
});

// ============================================
// RUTA DE SALUD (HEALTH CHECK)
// ============================================

app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// ============================================
// MANEJO DE ERRORES 404
// ============================================

app.use((req, res) => {
    res.status(404).json({
        error: 'Ruta no encontrada',
        path: req.path
    });
});

// ============================================
// INICIAR SERVIDOR
// ============================================

app.listen(PORT, () => {
    console.log('\n🚀 =========================================');
    console.log(`   Servidor corriendo en http://localhost:${PORT}`);
    console.log('   =========================================\n');
    console.log('   📝 API Endpoints disponibles:');
    console.log(`   GET    http://localhost:${PORT}/api/testimonials`);
    console.log(`   POST   http://localhost:${PORT}/api/testimonials`);
    console.log(`   GET    http://localhost:${PORT}/api/contact`);
    console.log(`   POST   http://localhost:${PORT}/api/contact`);
    console.log(`   GET    http://localhost:${PORT}/api/health`);
    console.log('\n   🌐 Portfolio disponible en:');
    console.log(`   http://localhost:${PORT}`);
    console.log('   =========================================\n');
});

module.exports = app;
