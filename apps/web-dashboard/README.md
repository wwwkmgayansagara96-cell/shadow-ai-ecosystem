# SHEDOW AI Web Dashboard

## 🌐 Modern Control Panel for SHEDOW AI Ecosystem

Built with **Next.js 14**, **React 18**, **TypeScript**, and **Tailwind CSS**.

## ✨ Features

✅ **Dashboard Overview**
- Real-time AI usage statistics
- System health monitoring
- Quick stats (requests, offline %, active plugins)

✅ **Plugin Management**
- Install/uninstall plugins
- Enable/disable plugins
- View plugin keywords and versions

✅ **Device Control**
- Control IoT devices (lights, speakers, AC)
- Real-time device status
- Quick toggle on/off

✅ **AI Usage Charts**
- Offline vs Cloud AI usage
- Real-time statistics
- Historical data

✅ **User Settings**
- AI preferences (offline/cloud toggle)
- Language selection
- TTS voice customization
- Pitch adjustment

✅ **Authentication**
- Secure login/signup
- JWT token management
- Protected routes
- Auto-logout on 401

## 🚀 Quick Start

### Install Dependencies
```bash
cd apps/web-dashboard
npm install
```

### Environment Variables
```bash
echo "NEXT_PUBLIC_API_URL=http://localhost:3000" > .env.local
```

### Development
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000)

### Production Build
```bash
npm run build
npm start
```

## 📁 Project Structure

```
apps/web-dashboard/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home/redirect
│   ├── login/
│   ├── signup/
│   ├── dashboard/
│   ├── globals.css
│   └── robots.ts
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── Card.tsx            # Card component
│   ├── Alert.tsx           # Alert component
│   ├── ProtectedLayout.tsx  # Route protection
│   ├── AIUsageChart.tsx     # Usage statistics
│   ├── DeviceControl.tsx    # IoT control
│   ├── PluginManager.tsx    # Plugin management
│   └── UserSettings.tsx     # User preferences
├── hooks/
│   └── useAuth.ts          # Auth state management
├── lib/
│   └── api.ts              # Axios instance
├── public/                 # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
└── postcss.config.js
```

## 🎨 Design System

**Colors:**
- Primary: `#00d4ff` (SHEDOW Blue)
- Secondary: `#a855f7` (Purple)
- Success: `#10b981` (Green)
- Background: `#0a0a0a` (Dark)
- Surface: `#1a1a1a` (Gray)

## 🔐 Authentication Flow

1. User visits `/`
2. App checks stored JWT token
3. If valid → Redirect to `/dashboard`
4. If invalid → Redirect to `/login`
5. Login/Signup → Store token in cookies
6. All API requests include token in headers
7. On 401 response → Auto-logout

## 🧬 State Management

Using **Zustand** for authentication state:

```typescript
const { user, isAuthenticated, login, logout } = useAuth()
```

## 📡 API Integration

Axios instance with interceptors for:
- Automatic token injection
- Error handling
- 401 auto-logout

## 🎯 Pages

| Route | Description |
|-------|-------------|
| `/` | Redirect (auto-login check) |
| `/login` | User login |
| `/signup` | Account creation |
| `/dashboard` | Main dashboard (protected) |
| `/plugins` | Plugin management (protected) |
| `/memory` | Memory graph viewer (protected) |
| `/settings` | User settings (protected) |

## 🌐 Deployment

### Vercel (Recommended)
```bash
vercel
```

### Docker
```bash
docker build -t shedow-web-dashboard .
docker run -p 3000:3000 shedow-web-dashboard
```

### Environment Variables (Production)
```
NEXT_PUBLIC_API_URL=https://api.shedow.ai
```

## 🔗 Dependencies

- **next** - React framework
- **react** - UI library
- **typescript** - Type safety
- **tailwindcss** - CSS framework
- **zustand** - State management
- **axios** - HTTP client
- **recharts** - Charts & graphs
- **lucide-react** - Icons
- **framer-motion** - Animations
- **socket.io-client** - Real-time updates

## 📊 API Endpoints Used

- `POST /auth/login` - User login
- `POST /auth/signup` - User signup
- `GET /user/profile` - Get user data
- `PUT /user/preferences` - Update settings
- `GET /plugins` - List plugins
- `POST /plugins/install` - Install plugin
- `POST /ai/process` - Process AI request
- `GET /ai/memory/:conversationId` - Get memory

## 🚀 Next Steps

- [ ] Add real-time WebSocket updates
- [ ] Implement memory graph visualization
- [ ] Add voice control interface
- [ ] Implement dark/light theme toggle
- [ ] Add analytics dashboard
- [ ] Create plugin marketplace UI
- [ ] Add device grouping & automation
- [ ] Implement user profile customization

## 📝 License

MIT - See LICENSE file
