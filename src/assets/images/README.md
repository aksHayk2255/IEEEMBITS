# Images

Drop real MBITS photographs and graphics in this folder, then import them
where they are needed. Vite fingerprints and optimises anything imported
from here, so this is preferred over `public/`.

```tsx
import campus from '../assets/images/campus.jpg';

<img src={campus} alt="MBITS campus" className="h-full w-full object-cover" />
```

For data files, import at the top of the file and pass the imported value:

```ts
import inaugural from '../assets/images/inaugural.jpg';

export const events: Event[] = [
  { title: '...', date: '...', category: '...', description: '...', image: inaugural },
];
```

Suggested names used by the current placeholders:

- `hero.jpg`   — wide campus or chapter photograph (hero section)
- `about.jpg`  — members at work (about section)

Until a file exists, the site shows a clearly marked placeholder instead of
a stock photo. Keep images under ~400 KB where possible and prefer `.webp`.
