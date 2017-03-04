SELECT m.id, c.name AS country_name, b.title AS bonus_title,m.message_status_id, ms.name AS message_status_name,  m.message_encoded, m.guessed
FROM message m
JOIN country c ON c.id = m.country_id
JOIN bonus b ON b.id = m.bonus_id
JOIN message_status ms ON ms.id = m.message_status_id
WHERE m.id = $1;