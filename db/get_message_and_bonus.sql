SELECT m.id, m.country_id, b.task_description
FROM message m
JOIN bonus b ON b.id = m.bonus_id
WHERE m.id = $1