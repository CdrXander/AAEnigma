SELECT m.id, b.title, m.message_encoded,m.message_status_id, ms.name AS status_name, c.name AS country_name
FROM message m
JOIN country c ON m.country_id = c.id
JOIN message_status ms ON m.message_status_id = ms.id
JOIN bonus b ON m.bonus_id = b.id
WHERE c.team_id != $1