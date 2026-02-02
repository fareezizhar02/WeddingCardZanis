# 🏗️ Architecture Guide: Adding New Pages

This guide demonstrates how to maintain clean architecture when adding new pages to the wedding invitation app.

## ✅ Correct Pattern: Composition Only

### Example 1: Photo Gallery Page

```typescript
// app/gallery/page.tsx
import GalleryPage from '@/components/gallery/GalleryPage';

export default function Gallery() {
  return <GalleryPage />;
}
```

```typescript
// components/gallery/GalleryPage.tsx
'use client';

import PhotoGrid from './PhotoGrid';
import PhotoModal from './PhotoModal';
import BottomAppBar from '../invitation/BottomAppBar';

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-cream-100">
      <main className="px-4 py-8 pb-28">
        <PhotoGrid />
        <PhotoModal />
      </main>
      <BottomAppBar />
    </div>
  );
}
```

### Example 2: RSVP Page

```typescript
// app/rsvp/page.tsx
import RSVPPage from '@/components/rsvp/RSVPPage';

export default function RSVP() {
  return <RSVPPage />;
}
```

```typescript
// components/rsvp/RSVPPage.tsx
'use client';

import { useState } from 'react';
import RSVPForm from './RSVPForm';
import RSVPConfirmation from './RSVPConfirmation';
import BottomAppBar from '../invitation/BottomAppBar';

export default function RSVPPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-cream-100">
      <main className="px-4 py-8 pb-28">
        {submitted ? (
          <RSVPConfirmation />
        ) : (
          <RSVPForm onSubmit={() => setSubmitted(true)} />
        )}
      </main>
      <BottomAppBar />
    </div>
  );
}
```

## ❌ Incorrect Pattern: Logic in Page File

### What NOT to do:

```typescript
// ❌ BAD - Logic in page file
// app/rsvp/page.tsx
'use client';

import { useState } from 'react';
import RSVPForm from '@/components/rsvp/RSVPForm';

export default function RSVP() {
  const [submitted, setSubmitted] = useState(false); // ❌ State management
  const [formData, setFormData] = useState({}); // ❌ Data handling

  const handleSubmit = async (data) => { // ❌ Business logic
    // ...
  };

  return ( // ❌ UI rendering with logic
    <div className="min-h-screen">
      {submitted ? (
        <div>Thanks!</div>
      ) : (
        <RSVPForm onSubmit={handleSubmit} />
      )}
    </div>
  );
}
```

## 📐 Architecture Rules

### Page File (`app/*/page.tsx`)
✅ DO:
- Import and render a single container component
- Export default function
- Keep it under 10 lines

❌ DON'T:
- Use `'use client'` directive
- Import `useState`, `useEffect`, or other hooks
- Define event handlers
- Include styling logic
- Manage state
- Fetch data directly

### Container Component (`components/*/Page.tsx`)
✅ DO:
- Manage page-level state
- Handle data fetching
- Coordinate child components
- Include layout and styling
- Use `'use client'` if needed

## 📁 Recommended Structure for New Features

```
components/
├── invitation/        # Main invitation (existing)
├── gallery/          # Photo gallery feature
│   ├── GalleryPage.tsx
│   ├── PhotoGrid.tsx
│   ├── PhotoCard.tsx
│   └── PhotoModal.tsx
├── rsvp/             # RSVP feature
│   ├── RSVPPage.tsx
│   ├── RSVPForm.tsx
│   ├── FormField.tsx
│   └── RSVPConfirmation.tsx
├── location/         # Location/maps feature
│   ├── LocationPage.tsx
│   ├── MapView.tsx
│   └── Directions.tsx
└── shared/           # Shared components
    ├── BottomAppBar.tsx  (move here eventually)
    ├── PageHeader.tsx
    └── LoadingSpinner.tsx
```

## 🎯 Benefits of This Architecture

1. **Testability**: Components are isolated and easy to test
2. **Reusability**: Page components can be used in different contexts
3. **Scalability**: Easy to add new pages without touching routing logic
4. **Clarity**: Clear separation between routing and UI logic
5. **Performance**: Better code splitting and lazy loading
6. **Team Collaboration**: Different developers can work on pages independently

## 🔄 Refactoring Checklist

When adding a new page, ensure:

- [ ] Page file only imports and renders
- [ ] No hooks in page file
- [ ] No event handlers in page file
- [ ] All logic is in component files
- [ ] Component folder has clear naming
- [ ] Shared components are identified and extracted
- [ ] Mobile-first responsive design
- [ ] Proper TypeScript types
- [ ] Accessibility considerations

## 💡 Pro Tips

1. **Start with the page component**: Design the full UI in a component first, then extract the page file last
2. **Keep components focused**: Each component should have one clear responsibility
3. **Share common UI**: Extract repeated patterns (headers, footers, cards) into shared components
4. **Use composition**: Build complex UIs by composing simple components
5. **Type everything**: Strong types prevent bugs and improve DX

---

Following this architecture ensures your wedding invitation app remains clean, scalable, and maintainable as it grows!
