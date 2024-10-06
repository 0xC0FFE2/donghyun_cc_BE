# DONGHYUN.CC 백엔드 엔진

mermaid
erDiagram
    ARTICLE {
        INTEGER article_id PK
        DATETIME article_date
        VARCHAR article_name
        VARCHAR thumbnail_url
        VARCHAR article_data_url
        ENUM article_view_mode
    }
    CATEGORY {
        UUID category_id PK
        VARCHAR category_name
    }
    ARTICLE ||--|| CATEGORY: ""
    ARTICLE }|--|{ CATEGORY: ""
