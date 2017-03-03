SELECT m.id, b.title, m.message_plain, m.message_encoded, m.create_time, ms.name AS status_name, ci.cipher_word, c.name AS country_name
FROM message m
JOIN country c ON m.country_id = c.id
JOIN message_status ms ON m.message_status_id = ms.id
JOIN cipher ci ON m.cipher_id = ci.id
JOIN bonus b ON m.bonus_id = b.id
WHERE c.team_id = $1