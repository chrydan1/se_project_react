# Copilot Instructions for SE Project React

## Project Overview
This is a **"What to Wear" (WTWR)** weather-based clothing recommendation app built with React + Vite. It integrates weather data to suggest appropriate clothing items and allows users to manage a personal wardrobe.

**Architecture:**
- **Frontend:** React 18.3 + Vite + React Router v6
- **Data Layer:** JSON Server (runs on port 3001) for mock API
- **Weather Integration:** OpenWeather API via `weatherApi.js`
- **State Management:** React Context (`CurrentTemperatureUnitContext`) + local component state

## Getting Started

### Essential Commands
```bash
npm run dev           # Start Vite dev server (port 3000) with browser auto-open
npm run json-server   # Start JSON Server (port 3001) - MUST run alongside dev server
npm run build         # Build for production
npm run lint          # Run ESLint (strict: max-warnings 0)
```

**Local Development Setup:**
1. Run `npm run json-server` in one terminal (provides API at http://localhost:3001)
2. Run `npm run dev` in another terminal (starts React app)
3. Both servers must be running for the app to work

## Architecture & Data Flow

### Core Data Model
Items stored in `db.json` have this structure:
```json
{
  "_id": 0,
  "name": "Beanie",
  "weather": "cold|hot|mild|default",
  "imageUrl": "https://..."
}
```

### Key Data Flows

**1. Clothing Items Management**
- `App.jsx` maintains `clothingItems` state (fetched via `getItems()` from api.js)
- Items displayed through `ClothesSection` → `ItemCard` components
- CRUD operations: `addItem()`, `deleteItem()` in `src/utils/api.js`
- All API calls use `baseUrl: http://localhost:3001`

**2. Weather Integration**
- `App.jsx` calls `getWeatherData()` on mount → sets `weatherData` and displays in `WeatherCard`
- Temperature unit toggle (`currentTempUnit` state) controlled via `handleTempUnitChange()`
- Passed via `CurrentTemperatureUnitContext` to enable global F/C conversion

**3. Modal State Management**
- `activeModal` string state in `App.jsx` triggers different modals:
  - `"item-modal"` → `ItemModal` (view/delete item details)
  - `"add-garment-modal"` → `AddItemModal` (add new clothing)
- Modal open/close controlled by `handleOpenModal()` and `handleCloseModal()`

## Project Patterns & Conventions

### Component Structure
- **Container components:** `App.jsx`, `Main.jsx`, `Profile.jsx` (manage state, logic)
- **Presentational components:** `ItemCard.jsx`, `WeatherCard.jsx`, `Footer.jsx` (UI only)
- **Reusable wrappers:** `ModalWithForm.jsx` (generic modal container), `ItemModal.jsx` (item details modal)
- CSS co-location: `ComponentName/ComponentName.jsx` + `ComponentName/ComponentName.css`

### Form Handling
- Use custom `useForm()` hook from `src/hooks/useForm.js` for form state:
  ```jsx
  const { values, handleChange, setValues } = useForm({ name: "", imageUrl: "", weather: "" });
  ```
- Hook provides `values`, `handleChange` event handler, and `setValues` for manual resets

### Context Usage
- Minimal context usage (only `CurrentTemperatureUnitContext` for temp unit)
- Prefer prop drilling over context for most data to keep component dependencies clear
- Context Provider wraps in `App.jsx`

### Styling
- CSS Modules-like naming: `.card__title`, `.modal_is-opened` (BEM convention)
- Theme assets in `src/assets/day/` and `src/assets/night/` folders
- Normalize.css imported from `src/vendor/normalize.css`
- Font configuration in `src/vendor/fonts/fonts.css`

## Critical Files & Their Purpose

| File | Purpose |
|------|---------|
| `src/utils/api.js` | HTTP calls to JSON Server (`getItems`, `addItem`, `deleteItem`) |
| `src/utils/weatherApi.js` | OpenWeather API integration with constants for icons/temp |
| `src/utils/constants.js` | Weather condition mappings, API keys, coordinates, condition images |
| `src/hooks/useForm.js` | Form state management hook (handles input changes) |
| `db.json` | JSON Server data source for clothing items (use `--id _id` flag) |
| `src/contexts/CurrentTemperatureUnitContext.js` | Global context for F/C temperature unit toggle |

## Common Tasks

### Adding a New Clothing Item Type
1. Update `db.json` items array with new `_id`, `name`, `weather` type, `imageUrl`
2. Component automatically renders via `ItemCard` in `ClothesSection`
3. Ensure `weather` value is one of: `"cold"`, `"hot"`, `"mild"`, `"default"`

### Modifying Weather Integration
- Weather condition images are in `src/utils/constants.js` → `weatherConditionImages` object
- Each condition has day/night variants (sunrise/sunset logic should be added)
- OpenWeather API coords are hardcoded in `constants.js` (coordinates, apiKey)

### Adding Modal Functionality
- Use `ModalWithForm` wrapper component with props: `isOpen`, `handleSubmit`, `title`, `buttonText`, `onClose`
- Add new modal type string to `activeModal` state in `App.jsx`
- Example: See `AddItemModal` and `ItemModal` implementations

## Development Notes

### ESLint Configuration
- Strict linting enforced: `--max-warnings 0` (zero warnings allowed in build)
- Check `package.json` → eslint rules use React and React Hooks plugins
- Common fixes: unused vars, missing prop validation, hook dependencies

### Hot Module Replacement (HMR)
- Vite provides HMR by default (fast refresh on save)
- Component state persists during edits if possible

### Common Patterns to Avoid
- Don't hardcode API URLs outside `src/utils/api.js` (use baseUrl constant)
- Don't create deeply nested component trees without refactoring to smaller units
- Don't mix API data fetching in multiple components (centralize in App.jsx)
