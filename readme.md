# DONGHYUN.CC 백엔드 엔진


## Article (게시물)

| Field Name          | Type       | Description                        |
|---------------------|------------|------------------------------------|
| `article_id`       | Integer(increment)    | 게시글 고유 ID (Primary Key)      |
| `article_date`     | DateTime   | 게시글 작성 날짜                  |
| `article_name`     | String     | 게시글 제목                       |
| `thumbnail_url`     | String     | 게시글 썸네일 URL                |
| `article_data_url`  | String     | 게시글 내용 MD파일 URL            |
| `article_view_mode` | Enum       | 게시글 조회 모드 (Enum) |
| `categorys`        | ManyToMany | 관련된 카테고리 (Category)        |

## Category (카테고리)

| Field Name          | Type       | Description                        |
|---------------------|------------|------------------------------------|
| `category_id`      | UUID       | 카테고리 고유 ID (Primary Key)    |
| `category_name`    | String     | 카테고리 이름                     |
| `articles`         | ManyToMany | 관련된 게시글 (Article)           |
