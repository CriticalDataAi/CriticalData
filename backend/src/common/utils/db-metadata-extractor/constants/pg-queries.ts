const pgMetadataQuery = `
with fk as (
	SELECT
	    tc.table_schema, 
	    tc.constraint_name, 
	    tc.table_name, 
	    kcu.column_name, 
	    ccu.table_schema AS foreign_table_schema,
	    ccu.table_name AS foreign_table_name,
	    ccu.column_name AS foreign_column_name 
	FROM information_schema.table_constraints AS tc 
	JOIN information_schema.key_column_usage AS kcu
	    ON tc.constraint_name = kcu.constraint_name
	    AND tc.table_schema = kcu.table_schema
	JOIN information_schema.constraint_column_usage AS ccu
	    ON ccu.constraint_name = tc.constraint_name
	WHERE tc.constraint_type = 'FOREIGN KEY'
)
select 
	c.table_name, c.column_name, c.column_default, c.is_nullable, c.udt_name,
	fk.foreign_table_schema, fk.foreign_table_name, fk.foreign_column_name
from information_schema.columns c
	left join fk on fk.table_schema = c.table_schema 
				and fk.table_name = c.table_name 
				and fk.column_name = c.column_name 
where c.table_schema = 'public'
order by 1, c.ordinal_position, 2
`;

export default pgMetadataQuery;
