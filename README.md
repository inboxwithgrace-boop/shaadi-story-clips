# Wedding Motion Studio

Build a new SaaS called "WedMotion" — a personalized Indian wedding invitation video maker.

IMPORTANT:

This is NOT a normal digital invitation website and NOT a Canva-style editor.

The core product is:

Customer chooses a premium wedding video template → enters wedding details → uploads couple/family photos → selects music/style → previews the personalized video → requests/generates the final video → receives/downloads the finished video.

The visual quality should feel premium, cinematic and wedding-focused.

TARGET USERS:

Indian couples and families who want a personalized wedding invitation video to share on WhatsApp and Instagram.

MVP FLOW:

1. LANDING PAGE

Create a premium cinematic Indian wedding landing page.

Hero headline:

"Your Wedding Story. Turned Into a Beautiful Video."

Subheadline:

"Create a personalized wedding invitation video with your names, photos, story and wedding details."

Primary CTA:

"Create Your Wedding Video"

Secondary CTA:

"Watch Demo"

Show a premium vertical wedding-video preview/mockup.

Sections:

- How it works

- Choose a template

- Add your details

- Upload your photos

- Get your personalized video

- Template showcase

- Pricing

- FAQ

Do NOT use fake testimonials, fake customer counts or fake statistics.

2. TEMPLATE SELECTION

Create a template gallery specifically for Indian wedding videos.

Initially create 4 templates:

Template 1:

"Royal Heritage"

- Burgundy, gold and ivory

- Traditional Indian luxury

- Elegant typography

- Palace/wedding aesthetic

Template 2:

"Modern Love Story"

- Minimal luxury

- Cream, black and muted gold

- Cinematic couple storytelling

- Modern typography

Template 3:

"Floral Romance"

- Soft ivory, blush and floral elements

- Romantic wedding aesthetic

- Elegant transitions

Template 4:

"Indian Celebration"

- Rich festive colors

- Traditional patterns

- Energetic wedding atmosphere

- Premium Indian celebration aesthetic

Each template card should show:

- Vertical video preview

- Template name

- Short description

- "Use This Template" button

3. WEDDING DETAILS FORM

After selecting a template, show a clean multi-step form.

Step 1:

Couple Details

Fields:

- Bride name

- Groom name

- Bride nickname (optional)

- Groom nickname (optional)

Step 2:

Wedding Details

Fields:

- Wedding date

- Wedding time

- Venue

- City

- Wedding hashtag (optional)

Step 3:

Family Details

Fields:

- Bride's parents

- Groom's parents

- Other family names (optional)

Step 4:

Wedding Story

Fields:

- How we met

- Our story

- Special message

Make this optional so users can skip it.

Step 5:

Photos

Allow upload of:

- Bride photo

- Groom photo

- Couple photo 1

- Couple photo 2

- Family photo

- Additional photos

Show image previews after upload.

Step 6:

Music

Allow the customer to choose from placeholder music options:

- Royal Celebration

- Romantic Cinematic

- Traditional Wedding

- Modern Love

Use royalty-free/placeholder audio for the MVP. Do not use copyrighted commercial songs.

4. VIDEO STRUCTURE

The generated video should conceptually follow this structure:

Scene 1:

Elegant opening animation

Scene 2:

Bride and groom names

Scene 3:

"Together with our families"

Scene 4:

Couple photos

Scene 5:

"Our Story"

Scene 6:

Wedding date

Scene 7:

Wedding venue

Scene 8:

Family details

Scene 9:

Additional couple photos

Scene 10:

Final wedding invitation

Scene 11:

"Join us as we begin forever."

Create a beautiful vertical 9:16 preview interface that represents these scenes.

IMPORTANT:

For this MVP, do NOT pretend that a real MP4 has been generated if no rendering backend exists.

Instead, create a realistic "Video Preview" experience using the selected data and template.

5. VIDEO PREVIEW

Create a premium vertical phone-style preview.

Show:

- Couple names

- Wedding date

- Venue

- Uploaded photos

- Story text

- Animated-looking transitions

- Template styling

Add controls:

- Play

- Pause

- Previous scene

- Next scene

- Restart

Show:

"Preview — Your final video will be rendered after confirmation."

6. PERSONALIZATION

When the user changes:

- Names

- Date

- Venue

- Photos

- Story

the preview should update immediately.

Do not use hardcoded sample information once the customer has entered their own information.

7. ORDER / PAYMENT FLOW

After preview:

Button:

"Continue"

Show order summary:

- Template

- Couple names

- Wedding date

- Number of photos

- Selected music

- Package

- Price

Create two packages:

Standard — ₹499

- 1 wedding video template

- Up to 6 photos

- Names and wedding details

- Background music

- HD video

Premium — ₹999

- Premium template

- Up to 12 photos

- Couple story

- Family details

- Premium animations

- HD video

Add:

"Continue to Payment"

For the MVP, payment can be represented as a placeholder flow. Do not claim that payment is actually processed unless a real payment gateway is connected.

8. ORDER CONFIRMATION

After the order is submitted, show:

"Your wedding video request has been received."

Show:

- Order ID

- Couple names

- Selected template

- Package

- Status: "Preparing your video"

Add:

"Share Order on WhatsApp"

Generate a WhatsApp message containing the order details.

Use a wa.me click-to-chat link, not api.whatsapp.com.

9. CUSTOMER DASHBOARD

Create a simple dashboard.

Sections:

- My Wedding Video

- Order status

- Selected template

- Uploaded photos

- Wedding details

- Preview

- Download button

If the final MP4 has not actually been generated, show:

"Your video is being prepared."

Do not create a fake download that does nothing.

10. ADMIN / CREATOR VIEW

Create a simple internal admin page for the MVP.

Show:

- Orders

- Customer name

- Couple names

- Wedding date

- Template

- Package

- Order status

Statuses:

Pending

Payment Pending

Paid

Rendering

Ready

Delivered

Allow the creator to change the order status.

11. DESIGN SYSTEM

Use a premium wedding aesthetic.

Style:

- Cinematic

- Elegant

- Luxury

- Indian wedding inspired

- Modern typography

- Soft shadows

- Subtle gradients

- Large editorial headings

- Beautiful cards

- Smooth transitions

Avoid:

- Generic SaaS blue

- Cheap-looking gradients

- Excessive rounded cards

- Cartoonish graphics

- Clutter

- Fake testimonials

- Fake statistics

The website must look like a premium wedding brand.

12. MOBILE FIRST

This product will mainly be used on mobile.

Make everything fully responsive.

The video preview should always use a 9:16 vertical ratio.

The interface should feel excellent on phones.

13. IMPORTANT TECHNICAL REQUIREMENT

Structure the application so that a real video rendering backend can be connected later.

Create a clear data model for:

WeddingProject:

- id

- brideName

- groomName

- weddingDate

- weddingTime

- venue

- city

- brideParents

- groomParents

- story

- photos

- music

- template

- package

- orderStatus

- createdAt

Keep the rendering layer modular.

For now, use a mock rendering state rather than pretending a real video file was generated.

14. DEMO DATA

Include one polished demo project:

Bride:

Shreya

Groom:

Shashwat

Wedding date:

12 December 2026

Venue:

Royal Palace, Jaipur

Use elegant placeholder photos and sample wedding story text.

This demo should make the product immediately understandable when someone opens the website.

15. NAVIGATION

Create:

Home

Templates

Create Video

Pricing

FAQ

Keep navigation simple.

16. FINAL PRODUCT GOAL

The entire experience should communicate one thing:

"Give us your wedding details and photos. We turn them into a beautiful personalized wedding video."

Build this as a real SaaS-style MVP with clean reusable components and a structure that can later connect to a real video rendering service.

Do not build unnecessary features such as social networking, chat, complex user profiles, or a full video editor.

Prioritize:

1. Premium templates

2. Easy personalization

3. Beautiful vertical video preview

4. Photo upload

5. Wedding story

6. Order flow

7. WhatsApp confirmation

8. Future-ready video rendering architecture

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://shaadi-story-clips.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/b000956e-c7f3-4888-b2d6-0d8cd517312f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
