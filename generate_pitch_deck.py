import os
import sys
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.dml.color import RGBColor
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)

    blank_slide_layout = prs.slide_layouts[6]

    # Theme colors
    DARK_BG = RGBColor(15, 23, 42)       # Slate 900
    CARD_BG = RGBColor(30, 41, 59)       # Slate 800
    BRAND_GREEN = RGBColor(16, 185, 129) # Emerald 500
    BRAND_GOLD = RGBColor(245, 158, 11) # Amber 500
    WHITE = RGBColor(255, 255, 255)
    LIGHT_GRAY = RGBColor(148, 163, 184) # Slate 400
    MUTED_GRAY = RGBColor(203, 213, 225) # Slate 300

    def add_background(slide):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = DARK_BG
        bg.line.fill.background()
        return bg

    def add_header(slide, title_text, category_text="FOODBRIDGE PITCH DECK"):
        # Header text frame
        txBox = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.7), Inches(1.0))
        tf = txBox.text_frame
        tf.word_wrap = True

        p_cat = tf.paragraphs[0]
        p_cat.text = category_text.upper()
        p_cat.font.size = Pt(11)
        p_cat.font.bold = True
        p_cat.font.color.rgb = BRAND_GREEN

        p_title = tf.add_paragraph()
        p_title.text = title_text
        p_title.font.size = Pt(26)
        p_title.font.bold = True
        p_title.font.color.rgb = WHITE

    # -------------------------------------------------------------
    # SLIDE 1: Title Slide
    # -------------------------------------------------------------
    slide1 = prs.slides.add_slide(blank_slide_layout)
    add_background(slide1)

    txBox = slide1.shapes.add_textbox(Inches(1.0), Inches(2.2), Inches(11.3), Inches(3.5))
    tf = txBox.text_frame
    tf.word_wrap = True

    p0 = tf.paragraphs[0]
    p0.text = "FOODBRIDGE"
    p0.font.size = Pt(54)
    p0.font.bold = True
    p0.font.color.rgb = BRAND_GREEN

    p1 = tf.add_paragraph()
    p1.text = "Save Food. Feed People. Reduce Waste."
    p1.font.size = Pt(28)
    p1.font.bold = True
    p1.font.color.rgb = WHITE

    p2 = tf.add_paragraph()
    p2.text = "\nA Real-Time Autonomous Marketplace Connecting Restaurants, Bakeries & Hotels with Local Shelters, NGOs, & Discount Buyers."
    p2.font.size = Pt(16)
    p2.font.color.rgb = LIGHT_GRAY

    # -------------------------------------------------------------
    # SLIDE 2: Problem Statement
    # -------------------------------------------------------------
    slide2 = prs.slides.add_slide(blank_slide_layout)
    add_background(slide2)
    add_header(slide2, "The Massive Food Surplus & Hunger Paradox", "PROBLEM STATEMENT")

    # Card 1: Restaurants
    card1 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.6), Inches(3.6), Inches(4.8))
    card1.fill.solid()
    card1.fill.fore_color.rgb = CARD_BG
    card1.line.color.rgb = BRAND_GOLD
    tf1 = card1.text_frame
    tf1.word_wrap = True
    tf1.text = "🍕 RESTAURANT CRISIS\n\n• Over 68 Million Tons of surplus food dumped annually in India alone.\n\n• Kitchens suffer massive revenue loss on unsold prepared food.\n\n• High logistics barrier to organize donations."

    # Card 2: Shelters
    card2 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.86), Inches(1.6), Inches(3.6), Inches(4.8))
    card2.fill.solid()
    card2.fill.fore_color.rgb = CARD_BG
    card2.line.color.rgb = BRAND_GREEN
    tf2 = card2.text_frame
    tf2.word_wrap = True
    tf2.text = "❤️ NGO & SHELTER SHORTAGE\n\n• 190+ Million people face daily food insecurity.\n\n• Local shelters struggle with unpredictable food supply and high procurement costs.\n\n• Zero real-time visibility on available nearby surplus."

    # Card 3: Economic Waste
    card3 = slide2.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.93), Inches(1.6), Inches(3.6), Inches(4.8))
    card3.fill.solid()
    card3.fill.fore_color.rgb = CARD_BG
    card3.line.color.rgb = LIGHT_GRAY
    tf3 = card3.text_frame
    tf3.word_wrap = True
    tf3.text = "📉 ENVIRONMENTAL IMPACT\n\n• Food waste accounts for 8%-10% of total global greenhouse emissions (CO₂).\n\n• Lack of tax-deduction tracking prevents commercial incentive to donate."

    # -------------------------------------------------------------
    # SLIDE 3: Solution
    # -------------------------------------------------------------
    slide3 = prs.slides.add_slide(blank_slide_layout)
    add_background(slide3)
    add_header(slide3, "FoodBridge: Real-Time Two-Sided Marketplace", "THE SOLUTION")

    txBox = slide3.shapes.add_textbox(Inches(0.8), Inches(1.8), Inches(11.7), Inches(4.5))
    tf = txBox.text_frame
    tf.word_wrap = True

    p = tf.paragraphs[0]
    p.text = "An autonomous, mobile-first marketplace linking food businesses with verified NGOs, riders, and budget buyers."
    p.font.size = Pt(18)
    p.font.color.rgb = WHITE

    features = [
      ("📍 Live Interactive GPS Map", "Geolocated Google Maps interface listing nearby surplus with live Directions routing."),
      ("⚡ AI Freshness & Expiry Engine", "Predicts exact remaining shelf life based on prep time, packaging, and ambient temp."),
      ("📄 Automated 80G Tax Receipts", "Instantly generates compliant Section 80G tax-deduction PDF certificates for donating businesses."),
      ("💳 Tiered Subscription & Wallet Payouts", "Stripe Checkout for paid restaurant tiers (Starter, Growth, Enterprise) with instant wallet payouts.")
    ]

    for title, desc in features:
        p_t = tf.add_paragraph()
        p_t.text = f"\n{title}"
        p_t.font.size = Pt(16)
        p_t.font.bold = True
        p_t.font.color.rgb = BRAND_GREEN

        p_d = tf.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(14)
        p_d.font.color.rgb = LIGHT_GRAY

    # -------------------------------------------------------------
    # SLIDE 4: Business Model
    # -------------------------------------------------------------
    slide4 = prs.slides.add_slide(blank_slide_layout)
    add_background(slide4)
    add_header(slide4, "Monetization & Subscription Tiers", "BUSINESS MODEL")

    # Tier 1
    t1 = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(0.8), Inches(1.8), Inches(3.6), Inches(4.5))
    t1.fill.solid()
    t1.fill.fore_color.rgb = CARD_BG
    t1.line.color.rgb = BRAND_GREEN
    t1.text_frame.word_wrap = True
    t1.text_frame.text = "STARTER TIER\n₹1,999 / mo ($29)\n\n• For Single Restaurants & Bakeries\n• Unlimited Surplus Listings\n• Standard 80G Tax Receipts\n• Live GPS Marker on Map"

    # Tier 2
    t2 = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(4.86), Inches(1.8), Inches(3.6), Inches(4.5))
    t2.fill.solid()
    t2.fill.fore_color.rgb = CARD_BG
    t2.line.color.rgb = BRAND_GOLD
    t2.text_frame.word_wrap = True
    t2.text_frame.text = "GROWTH TIER\n₹6,999 / mo ($99)\n\n• For Multi-Branch Chains & Hotels\n• Priority AI Matching & Routing\n• Express Wallet Payouts\n• Automated ESG Compliance Reports"

    # Tier 3
    t3 = slide4.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(8.93), Inches(1.8), Inches(3.6), Inches(4.5))
    t3.fill.solid()
    t3.fill.fore_color.rgb = CARD_BG
    t3.line.color.rgb = WHITE
    t3.text_frame.word_wrap = True
    t3.text_frame.text = "ENTERPRISE & MARKETPLACE\nCustom Tier + 10% Fee\n\n• For Supermarket Chains & Caterers\n• Direct Spring Boot API Integration\n• Discount Surplus Marketplace Fee (10% per sale)\n• Dedicated Logistics Partner Dispatch"

    # -------------------------------------------------------------
    # SLIDE 5: Tech Architecture
    # -------------------------------------------------------------
    slide5 = prs.slides.add_slide(blank_slide_layout)
    add_background(slide5)
    add_header(slide5, "Enterprise Production Tech Stack", "TECHNOLOGY ARCHITECTURE")

    txBox = slide5.shapes.add_textbox(Inches(0.8), Inches(1.8), Inches(11.7), Inches(4.5))
    tf = txBox.text_frame
    tf.word_wrap = True

    tech_items = [
        ("Frontend Web Platform", "React (Vite), Tailwind CSS, Lucide Icons, Leaflet & Google Maps API"),
        ("Cross-Platform Mobile App", "Flutter 3.x Native App (Android APK & iOS) + Capacitor Webview wrapper"),
        ("Backend REST Services", "Spring Boot 3.2 (Java 17), Spring Security JWT, Google OAuth2, WebSockets"),
        ("Database & Schema", "MySQL 8.0 / PostgreSQL with 23 relational tables (users, listings, subscriptions, receipts)"),
        ("Integrations & Infra", "Stripe Subscription Billing, Firebase Phone Auth OTP, Resend Email + Twilio SMS Alerts")
    ]

    for label, stack in tech_items:
        p1 = tf.add_paragraph()
        p1.text = f"• {label}: "
        p1.font.bold = True
        p1.font.size = Pt(16)
        p1.font.color.rgb = BRAND_GREEN

        p2 = tf.add_paragraph()
        p2.text = f"  {stack}\n"
        p2.font.size = Pt(14)
        p2.font.color.rgb = WHITE

    # Save presentations
    desktop_path = r"C:\Users\A2Z MEHTA\Desktop\FoodBridge_Pitch_Deck.pptx"
    public_path = r"C:\Users\A2Z MEHTA\.gemini\antigravity\scratch\foodbridge\frontend\public\FoodBridge_Pitch_Deck.pptx"

    prs.save(desktop_path)
    prs.save(public_path)
    print(f"SUCCESS: Saved to {desktop_path} and {public_path}")

if __name__ == '__main__':
    create_presentation()
