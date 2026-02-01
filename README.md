# Piggy Bank Account Dashboard

A responsive dashboard for managing bank accounts, visualizing balances, tracking spending, and receiving notifications and alerts.

## Features
- User authentication (login/logout)
- Account summary with clickable cards
- Balance and spending charts
- Alerts for unusual spending
- Notification panel with categorized alerts
- Theme toggle (light/dark)

## Tech Stack
- React (TypeScript)
- Vite
- Material UI
- React Router

## Getting Started

### Prerequisites
- Node.js (v16+ recommended)
- npm or yarn

### Installation
```bash
npm install
```

### Running the App
```bash
npm run dev
```
Visit [http://localhost:5173/](http://localhost:5173/) in your browser.

### Building for Production
```bash
npm run build
```

## Project Structure
```
src/
	components/
		AccountSummary/
		BalanceChart/
		Layout/
		NavBar/
		NotificationPanel/
		SpendingChart/
		SpendingWarnings/
		Theme/
		Logout.tsx
	mocks/
	pages/
		Account/
		Dashboard/
		Login/
	styles/
public/
```

## Testing
- TODO 

## Future fix/enhancement
- Implement Material UI's color palette mode to organize the dark mode (https://mui.com/material-ui/customization/dark-mode/)
- Use CSS module
- Add the account settings page to set the Alerts threshold to show them in the charts and notifications
- Add a component in Dashboard page to show the top 10 merchants table of Past Month vs. Past 12 month

## License
MIT
