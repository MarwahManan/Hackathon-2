---
name: database-skill
description: Create tables, manage migrations, and design database schemas for relational databases.
---

# Database Skill – Schema Design & Migrations

## Instructions

1. **Schema Design**
   - Design normalized database schemas for relational databases
   - Define tables, columns, data types, constraints, and indexes
   - Establish relationships (one-to-one, one-to-many, many-to-many)
   - Ensure data integrity with primary keys, foreign keys, and unique constraints
   - Optimize schema for query performance and storage efficiency

2. **Table Creation**
   - Write SQL or ORM-based table definitions
   - Include default values, nullable constraints, and indexes where appropriate
   - Ensure naming conventions are consistent and descriptive

3. **Migrations**
   - Implement database migrations for schema changes
   - Version control migrations to allow rollback and reproducibility
   - Apply migrations safely to development, staging, and production environments
   - Validate migration effects and ensure no data loss

4. **Data Modeling**
   - Translate business requirements into entity-relationship models
   - Ensure scalability and maintainability of the schema
   - Consider query patterns and access frequency in design decisions

5. **Index & Performance**
   - Add indexes on frequently queried columns
   - Avoid over-indexing to reduce write overhead
   - Optimize for balanced read/write performance

## Best Practices
- Follow consistent naming conventions for tables, columns, and indexes
- Avoid redundant data and ensure normalization
- Use indexes thoughtfully to balance read/write performance
- Test migrations in a staging environment before production
- Document schema, relationships, and constraints clearly
- Backup data before applying destructive migrations

## Example Structure

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  password TEXT NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Posts table with foreign key to users
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  content TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Example indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_posts_user_id ON posts(user_id);
