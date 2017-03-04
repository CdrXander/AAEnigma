SELECT t.id, t.target_country_id, c.name AS country_name, t.message_id,
    m.message_plain AS message_text, t.task_description, t.completed
FROM task t
JOIN country c ON c.id = t.target_country_id
JOIN message m ON m.id = t.message_id
