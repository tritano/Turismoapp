INSERT INTO users (email, name)
VALUES ('demo@turismoapp.com', 'Usuario Demo')
ON CONFLICT DO NOTHING;
