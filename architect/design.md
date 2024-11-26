# Afarensis Frontend Design Specification

## Global Elements

### Navigation Bar
1. **Main Navigation (Sticky)**
   - Logo (Afarensis)
   - Primary Links:
     * Marketplace
     * Solutions
     * Pricing
     * Documentation
     * Company
   - Secondary Items:
     * Search Bar (GPU/Instance search)
     * Login/Sign Up buttons
     * Dark/Light Mode Toggle

2. **Dropdown Menus**
   - Solutions Dropdown:
     * AI Training
     * Machine Learning
     * Rendering
     * Scientific Computing
     * Cryptocurrency Mining
   
   - Company Dropdown:
     * About Us
     * Blog
     * Careers
     * Contact
     * Press Kit

### Footer
1. **Main Footer Sections**
   - Product
     * Marketplace
     * GPU Types
     * Pricing Calculator
     * Case Studies
     * Status Page
   
   - Developers
     * Documentation
     * API Reference
     * SDK & Tools
     * GitHub
     * Developer Blog
   
   - Company
     * About
     * Careers
     * Blog
     * Press
     * Contact
   
   - Legal
     * Terms of Service
     * Privacy Policy
     * Cookie Policy
     * Acceptable Use
     * SLA

2. **Bottom Footer**
   - Copyright Notice
   - Social Media Links
     * LinkedIn
     * Twitter
     * GitHub
     * Discord
   - Language Selector
   - Region Selector

## Page Layouts

### Landing Page (/)
1. **Hero Section**
   - Main Headline: "Enterprise-Grade GPU Computing On Demand"
   - Sub-headline: "Access AWS and GCP GPU resources at competitive prices"
   - Primary CTA: "Get Started"
   - Secondary CTA: "View Pricing"
   - Background: Animated gradient with GPU visualization
   - Key Metrics:
     * Available GPUs
     * Active Users
     * Cloud Providers
     * Cost Savings

2. **Features Grid**
   - Instant Access
   - Flexible Pricing
   - Enterprise Security
   - 24/7 Support
   - Performance Monitoring
   - Auto-scaling

3. **GPU Catalog Preview**
   - Popular GPU Types
   - Real-time Availability
   - Quick Price Comparison
   - Instant Deploy Button

4. **How It Works**
   - Step 1: Choose GPU
   - Step 2: Configure Instance
   - Step 3: Deploy
   - Step 4: Monitor & Scale

5. **Use Cases Section**
   - AI/ML Training
   - Rendering
   - Scientific Computing
   - Data Analytics
   - Each with:
     * Icon
     * Description
     * Success Metric
     * Learn More Link

6. **Price Comparison Tool**
   - Interactive Calculator
   - Provider Comparison
   - Cost Estimation
   - ROI Calculator

7. **Social Proof**
   - Customer Logos
   - Testimonials
   - Case Studies Preview
   - Industry Recognition

8. **Resources Section**
   - Latest Blog Posts
   - Documentation Links
   - Tutorial Videos
   - Community Highlights

### Marketplace Page (/marketplace)
1. **Search & Filter Panel**
   - Search Bar
   - Filters:
     * GPU Type
     * Memory Size
     * Provider
     * Price Range
     * Availability
     * Region
   - Sort Options:
     * Price (Low to High)
     * Performance
     * Availability
     * Popular

2. **GPU Listings**
   - Card View/List View Toggle
   - Each GPU Card:
     * GPU Image/Icon
     * Name & Specifications
     * Provider Logo
     * Price (per hour/month)
     * Availability Status
     * Quick Deploy Button
     * Compare Checkbox
   - Pagination/Infinite Scroll

3. **Comparison Feature**
   - Floating Compare Bar
   - Detailed Spec Comparison
   - Price Comparison
   - Performance Metrics

### Dashboard (/dashboard)
1. **Overview Section**
   - Active Instances
   - Resource Usage
   - Billing Overview
   - Quick Actions

2. **Resource Monitor**
   - GPU Utilization
   - Memory Usage
   - Cost Tracking
   - Performance Metrics

3. **Instance Management**
   - Active Instances List
   - Instance Controls
   - Scaling Options
   - Logs & Metrics

## Design System

1. **Color Palette**
   - Primary: #374151 (Neutral-700)
   - Secondary: #F43F5E (Rose-500)
   - Accent: #F97316 (Orange-500)
   - Background: 
     * Light: #FFFFFF
     * Dark: #111827
   - Text:
     * Primary: #374151 (Neutral-700)
     * Secondary: #6B7280 (Neutral-500)
     * Muted: #9CA3AF (Neutral-400)

2. **Typography**
   - Headings: Inter
   - Body: Inter
   - Monospace: JetBrains Mono
   - Scale:
     * H1: 48px/3rem
     * H2: 36px/2.25rem
     * H3: 24px/1.5rem
     * Body: 16px/1rem
     * Small: 14px/0.875rem

3. **Components**
   - Buttons:
     * Primary
     * Secondary
     * Tertiary
     * Ghost
   - Cards:
     * Resource Card
     * Pricing Card
     * Feature Card
   - Forms:
     * Input Fields
     * Dropdowns
     * Toggles
     * Checkboxes

4. **Animations**
   - Page Transitions
   - Loading States
   - Hover Effects
   - Micro-interactions

5. **Responsive Breakpoints**
   - Extra Small (xs): 320px
     * Small phones
     * Minimal layouts
     * Single column designs
   
   - Small (sm): 375px
     * Large phones
     * Compact layouts
     * Enhanced mobile views
   
   - Medium (md): 768px
     * Tablets
     * Two column layouts
     * Navigation changes
   
   - Large (lg): 1024px
     * Laptops/Small Desktops
     * Multi-column layouts
     * Full navigation
   
   - Extra Large (xl): 1280px
     * Large Laptops
     * Expanded layouts
     * Additional content areas
   
   - 2XL: 1536px
     * Large Desktops
     * Maximized layouts
     * Full feature display
   
   - 3XL: 1920px
     * Ultra Wide Displays
     * Optimized for large screens
     * Maximum content display