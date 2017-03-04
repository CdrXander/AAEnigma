SELECT m.id, m.country_id, c.name AS country_name, m.bonus_id, b.title AS bonus_title,m.message_status_id, ms.name AS status_name,
 m.cipher_id, ci.cipher_word, m.message_plain, m.message_encoded, m.guessed, m.create_time
FROM message m
JOIN country c ON m.country_id = c.id
JOIN message_status ms ON m.message_status_id = ms.id
JOIN cipher ci ON m.cipher_id = ci.id
JOIN bonus b ON m.bonus_id = b.id