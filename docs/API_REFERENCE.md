# CherryOS API Reference

This document provides detailed information about the components, hooks, and utilities available in CherryOS.

## Table of Contents

1. [Components](#components)
2. [Hooks](#hooks)
3. [Context Providers](#context-providers)
4. [Utilities](#utilities)
5. [Constants](#constants)

## Components

### OSProvider

The main context provider that manages the entire OS state.

**Props:**
- `children` (ReactNode): Child components to wrap with the provider

**Context Value:**
```javascript
{
  bootState: string,        // 'off', 'locked', 'desktop'
  setBootState: function,   // Setter for bootState
  windows: array,           // Array of open windows
  openWindow: function,     // Function to open a new window
  closeWindow: function,    // Function to close a window
  minimizeWindow: function, // Function to minimize a window
  focusWindow: function,    // Function to focus a window
  activeWindowId: string,   // ID of the currently active window
  isMobile: boolean         // Whether the device is mobile
}
```

### WindowFrame

Component that renders a draggable, resizable window.

**Props:**
- `window` (object): Window configuration object
  - `id` (string): Unique identifier
  - `component` (React.Component): Component to render inside the window
  - `title` (string): Window title
  - `icon` (React.Component): Icon component
  - `props` (object): Props to pass to the component
  - `minimized` (boolean): Whether the window is minimized
  - `zIndex` (number): Z-index for stacking
  - `position` (object): Window position {x, y}

### DesktopIcon

Component for desktop application icons.

**Props:**
- `icon` (React.Component): Icon component to display
- `label` (string): Text label for the icon
- `onClick` (function): Function to call when clicked

### Taskbar

System taskbar component that shows running applications and system information.

**Props:**
None

### LockScreen

Lock screen component that appears when the OS is locked.

**Props:**
None

### BootScreen

Boot screen component that appears during OS initialization.

**Props:**
None

## Hooks

### useDraggable

Hook for adding draggable functionality to components.

**Parameters:**
- `initialPosition` (object): Initial position {x, y}

**Returns:**
```javascript
{
  position: {x, y},        // Current position
  handleMouseDown: func    // Mouse down handler for dragging
}
```

### useTime

Hook for getting the current time that updates every second.

**Returns:**
- `Date`: Current date and time

### useOS

Hook for accessing the OS context.

**Returns:**
- OS context value (see OSProvider context value above)

## Context Providers

### OSContext

React context that provides OS state and functions to child components.

## Utilities

### VST_LIST

Object containing categorized lists of music production plugins.

```javascript
{
  Dynamics: [...],
  'Reverb/Delay': [...],
  Instruments: [...],
  Creative: [...],
  Utility: [...]
}
```

### ANIME_DATA

Static data for the watch log application.

```javascript
{
  user: {
    name: string,
    avatar: string,
    stats: {
      animeCount: number,
      mangaCount: number,
      meanScore: number
    }
  },
  catalogue: [...]
}
```

### GAMING_DATA

Static data for the game center application.

```javascript
{
  steam: {...},
  retro: {...}
}
```

### TRACKS

Array of track information for the music player.

```javascript
[
  {
    title: string,
    artist: string,
    duration: string,
    lyrics: [...]
  },
  ...
]
```

## Application Components

### TerminalApp

Interactive terminal application component.

**Props:**
None

### MySongsApp

Music player application component.

**Props:**
None

### WatchLogApp

Media catalog application component.

**Props:**
None

### GameCenterApp

Gaming profile application component.

**Props:**
None

### StudioRackApp

Audio plugin inventory application component.

**Props:**
None

## Constants

### APPS

Array of available applications with their metadata.

```javascript
[
  {
    id: string,
    title: string,
    icon: React.Component,
    component: React.Component
  },
  ...
]
```

## Customization

To customize CherryOS, you can:

1. Modify the data constants (VST_LIST, ANIME_DATA, GAMING_DATA, TRACKS)
2. Add new applications by creating components and adding them to APPS
3. Customize styling through Tailwind CSS classes
4. Extend functionality by adding new hooks or modifying existing ones

## Extending Applications

To add a new application:

1. Create a new component for your application
2. Add it to the APPS array in the Desktop component
3. Ensure it follows the same pattern as existing applications
4. Test thoroughly across different screen sizes

## Performance Considerations

- Use React.memo for components that render frequently
- Implement useCallback for event handlers passed to child components
- Consider code splitting for larger applications
- Optimize re-renders by memoizing expensive calculations