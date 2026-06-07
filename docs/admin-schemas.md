# Admin Schemas Reference

The admin panel uses a schema-driven CRUD system. Each collection is defined by a `SchemaField[]` array in `AdminContext.tsx` that drives dynamic form rendering in `AdminCollection.tsx`.

## Field Types

| Type          | Form Control          | Description                             |
|---------------|-----------------------|-----------------------------------------|
| `text`        | `<input>`             | Single-line text input                  |
| `textarea`    | `<textarea>`          | Multi-line text area                    |
| `email`       | `<input type="email">`| Email input with validation             |
| `tel`         | `<input type="tel">`  | Phone input                             |
| `number`      | `<input type="number">`| Numeric input                          |
| `select`      | `<select>`            | Dropdown with dynamic/static options    |
| `image`       | Image picker          | URL input + gallery selection modal     |
| `list`        | List editor           | Add/remove/reorder items                |
| `group`       | Field group           | Accordion container for sub-fields      |

## Collections

### doctors
| Field            | Type      | Notes                             |
|------------------|-----------|-----------------------------------|
| name             | text      |                                   |
| specialty        | select    | Options from department list      |
| qualifications   | text      |                                   |
| experience       | text      | e.g. "15+ Years"                  |
| image            | image     |                                   |
| bio              | textarea  |                                   |
| availability     | select    | Mon-Fri, Weekends, 24/7           |

### services
| Field            | Type      | Notes                             |
|------------------|-----------|-----------------------------------|
| name             | text      |                                   |
| desc             | textarea  |                                   |
| icon             | select    | Options from icon sprite list     |
| image            | image     |                                   |
| isCritical       | toggle    | Shows in Critical Care section    |

### packages
| Field            | Type      | Notes                             |
|------------------|-----------|-----------------------------------|
| name             | text      |                                   |
| desc             | textarea  |                                   |
| price            | text      | e.g. "₹2,999"                     |
| oldPrice         | text      | Optional strikethrough price      |
| features         | list      | Bullet point features             |
| badge            | select    | "Popular", "Best Value", etc.     |
| featured         | toggle    | Dark card variant                  |
| image            | image     |                                   |

### jobs
| Field            | Type      | Notes                             |
|------------------|-----------|-----------------------------------|
| title            | text      |                                   |
| department       | select    | Options from department list      |
| location         | text      |                                   |
| type             | select    | Full-Time, Part-Time, Contract    |
| desc             | textarea  |                                   |
| requirements     | list      |                                   |

### insights
| Field            | Type      | Notes                             |
|------------------|-----------|-----------------------------------|
| title            | text      |                                   |
| category         | select    | Blog, News, Research              |
| excerpt          | textarea  |                                   |
| content          | textarea  | Full article body                 |
| image            | image     |                                   |
| date             | text      | Display date string               |

### gallery
| Field            | Type      | Notes                             |
|------------------|-----------|-----------------------------------|
| image            | image     |                                   |
| caption          | text      |                                   |
| category         | select    | Infrastructure, Events, etc.      |

### values
| Field            | Type      | Notes                             |
|------------------|-----------|-----------------------------------|
| id               | text      | kebab-case identifier             |
| icon             | select    | Icon name from sprite sheet       |
| title            | text      |                                   |
| desc             | text      |                                   |

### stats
| Field            | Type      | Notes                             |
|------------------|-----------|-----------------------------------|
| label            | text      | e.g. "Happy Patients"             |
| value            | text      | e.g. "50,000+"                    |
| icon             | select    | Icon name from sprite sheet       |

### accreditations
| Field            | Type      | Notes                             |
|------------------|-----------|-----------------------------------|
| name             | text      |                                   |
| image            | image     | Logo/image                        |

### benefits
| Field            | Type      | Notes                             |
|------------------|-----------|-----------------------------------|
| icon             | select    |                                   |
| title            | text      |                                   |
| desc             | text      |                                   |

## Settings (Site, About, Careers)

Settings are single-record forms stored under `INBOXES.settings`:

- **site**: heroEyebrow, heroTitle, heroAccent, heroLead, phone, emergencyPhone, email, address, mapEmbedUrl, social links
- **about**: mission, vision, journey story, journey image
- **careers**: hero title, hero description, mission statement

## Auth

Default admin credentials: `admin` / `admin123`

Users are stored in `localStorage['shubham_users']`. Login state persists via `sessionStorage['shubham_session']`.
