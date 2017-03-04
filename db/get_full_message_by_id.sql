SELECT m.id, c.name AS country_name, b.title, m.message_status_id, ms.name AS status_name, ci.cipher_word, m.message_plain, m.message_encoded
FROM message m
JOIN country c ON c.id = m.country_id
JOIN bonus b ON b.id = m.bonus_id
JOIN cipher ci ON ci.id = m.cipher_id
JOIN message_status ms ON ms.id = m.message_status_id
WHERE m.id = $1;