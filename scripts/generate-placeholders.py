"""
Soft placeholder illustration for the Nimbus™ gift.
They stand in until real photography is ready.
Run:  python3 scripts/generate-placeholders.py
"""
import math
import os
import random

OUT = os.path.join(os.path.dirname(__file__), '..', 'public', 'images', 'placeholders')
W, H = 1000, 1250


def shade(hex_, f):
    h = hex_.lstrip('#')
    r, g, b = (int(h[i:i + 2], 16) for i in (0, 2, 4))
    if f >= 0:
        r, g, b = (int(c + (255 - c) * f) for c in (r, g, b))
    else:
        r, g, b = (int(c * (1 + f)) for c in (r, g, b))
    return f'#{r:02x}{g:02x}{b:02x}'


def frame(uid, body, bg='#F1EBE2'):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" preserveAspectRatio="xMidYMid slice">
  <defs>
    <radialGradient id="bg-{uid}" cx="0.5" cy="0.38" r="0.85">
      <stop offset="0" stop-color="{shade(bg, 0.55)}"/>
      <stop offset="1" stop-color="{shade(bg, -0.05)}"/>
    </radialGradient>
    <filter id="bl-{uid}" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22"/></filter>
    <filter id="bs-{uid}" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="5"/></filter>
    <filter id="gr-{uid}" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="3"/>
      <feColorMatrix type="saturate" values="0"/>
      <feComponentTransfer><feFuncA type="table" tableValues="0 0.05"/></feComponentTransfer>
      <feComposite in2="SourceGraphic" operator="in"/>
    </filter>
  </defs>
  <rect width="{W}" height="{H}" fill="url(#bg-{uid})"/>
  {body}
  <rect width="{W}" height="{H}" fill="#fff" filter="url(#gr-{uid})"/>
</svg>
'''


def bubbles(uid, clip, x0, y0, x1, y1, colour, step, seed):
    """Soft raised bumps: the rippled rex-rabbit fur surface."""
    random.seed(seed)
    hi, lo = shade(colour, 0.38), shade(colour, -0.2)
    out = [f'<clipPath id="cp-{uid}"><path d="{clip}"/></clipPath><g clip-path="url(#cp-{uid})">']
    y, row = y0, 0
    while y < y1:
        x = x0 + (step / 2 if row % 2 else 0)
        while x < x1:
            r = step * random.uniform(0.42, 0.55)
            out.append(f'<ellipse cx="{x:.0f}" cy="{y + r*0.25:.0f}" rx="{r:.0f}" ry="{r*0.8:.0f}" fill="{lo}" opacity="0.35" filter="url(#bs-{uid})"/>')
            out.append(f'<ellipse cx="{x - r*0.15:.0f}" cy="{y - r*0.2:.0f}" rx="{r*0.75:.0f}" ry="{r*0.55:.0f}" fill="{hi}" opacity="0.55" filter="url(#bs-{uid})"/>')
            x += step
        y += step * 0.78
        row += 1
    out.append('</g>')
    return ''.join(out)


def blanket(uid, cx, cy, s, colour):
    """Faux-fur blanket draped over an invisible seat, spilling down."""
    lo = shade(colour, -0.18)
    d = (f'M {cx-300*s} {cy-210*s} C {cx-120*s} {cy-260*s}, {cx+150*s} {cy-250*s}, {cx+310*s} {cy-200*s} '
         f'C {cx+330*s} {cy-40*s}, {cx+300*s} {cy+150*s}, {cx+330*s} {cy+300*s} '
         f'C {cx+180*s} {cy+340*s}, {cx+20*s} {cy+300*s}, {cx-120*s} {cy+330*s} '
         f'C {cx-250*s} {cy+350*s}, {cx-330*s} {cy+310*s}, {cx-340*s} {cy+280*s} '
         f'C {cx-300*s} {cy+120*s}, {cx-350*s} {cy-60*s}, {cx-300*s} {cy-210*s} Z')
    return (f'<ellipse cx="{cx}" cy="{cy+350*s}" rx="{360*s}" ry="{40*s}" fill="#4d3b30" opacity="0.22" filter="url(#bl-{uid})"/>'
            f'<path d="{d}" fill="{colour}"/>'
            + bubbles(uid, d, cx - 360 * s, cy - 270 * s, cx + 360 * s, cy + 370 * s, colour, 74 * s, 7) +
            f'<path d="{d}" fill="none" stroke="{lo}" stroke-width="{6*s}" opacity="0.4" filter="url(#bs-{uid})"/>')


def hoodie(uid, cx, cy, s, colour):
    """Wearable hooded blanket, laid flat: hood, roomy body, soft sleeves."""
    hi, lo = shade(colour, 0.3), shade(colour, -0.25)
    body = (f'M {cx-120*s} {cy-230*s} C {cx-200*s} {cy-215*s}, {cx-250*s} {cy-180*s}, {cx-270*s} {cy-120*s} '
            f'L {cx-400*s} {cy+40*s} C {cx-430*s} {cy+90*s}, {cx-390*s} {cy+150*s}, {cx-330*s} {cy+120*s} '
            f'L {cx-250*s} {cy+60*s} C {cx-265*s} {cy+200*s}, {cx-270*s} {cy+330*s}, {cx-250*s} {cy+420*s} '
            f'C {cx-80*s} {cy+445*s}, {cx+80*s} {cy+445*s}, {cx+250*s} {cy+420*s} '
            f'C {cx+270*s} {cy+330*s}, {cx+265*s} {cy+200*s}, {cx+250*s} {cy+60*s} '
            f'L {cx+330*s} {cy+120*s} C {cx+390*s} {cy+150*s}, {cx+430*s} {cy+90*s}, {cx+400*s} {cy+40*s} '
            f'L {cx+270*s} {cy-120*s} C {cx+250*s} {cy-180*s}, {cx+200*s} {cy-215*s}, {cx+120*s} {cy-230*s} Z')
    hood = (f'M {cx-150*s} {cy-200*s} C {cx-175*s} {cy-330*s}, {cx-95*s} {cy-420*s}, {cx} {cy-420*s} '
            f'C {cx+95*s} {cy-420*s}, {cx+175*s} {cy-330*s}, {cx+150*s} {cy-200*s} '
            f'C {cx+80*s} {cy-165*s}, {cx-80*s} {cy-165*s}, {cx-150*s} {cy-200*s} Z')
    hood_in = (f'M {cx-95*s} {cy-215*s} C {cx-110*s} {cy-310*s}, {cx-55*s} {cy-370*s}, {cx} {cy-370*s} '
               f'C {cx+55*s} {cy-370*s}, {cx+110*s} {cy-310*s}, {cx+95*s} {cy-215*s} Z')
    return (f'<ellipse cx="{cx}" cy="{cy+440*s}" rx="{330*s}" ry="{36*s}" fill="#4d3b30" opacity="0.22" filter="url(#bl-{uid})"/>'
            f'<path d="{body}" fill="{colour}"/>'
            f'<path d="M {cx-230*s} {cy-120*s} C {cx-120*s} {cy-60*s}, {cx-40*s} {cy+150*s}, {cx-60*s} {cy+420*s}" stroke="{hi}" stroke-width="{26*s}" fill="none" opacity="0.35" filter="url(#bs-{uid})"/>'
            f'<path d="M {cx+40*s} {cy-150*s} C {cx+80*s} {cy}, {cx+60*s} {cy+200*s}, {cx+90*s} {cy+420*s}" stroke="{lo}" stroke-width="{18*s}" fill="none" opacity="0.3" filter="url(#bs-{uid})"/>'
            f'<path d="M {cx-250*s} {cy+60*s} L {cx-250*s} {cy+60*s}" />'
            f'<path d="{hood}" fill="{shade(colour, 0.06)}"/>'
            f'<path d="{hood_in}" fill="{lo}" opacity="0.55"/>'
            f'<path d="{hood_in}" fill="#ffffff" opacity="0.08"/>')


def cloud(uid, cx, cy, s):
    """Nimbus™: a squishy white cloud pillow with a sleepy little face."""
    d = (f'M {cx-260*s} {cy+120*s} C {cx-360*s} {cy+110*s}, {cx-370*s} {cy-20*s}, {cx-280*s} {cy-40*s} '
         f'C {cx-300*s} {cy-150*s}, {cx-170*s} {cy-200*s}, {cx-100*s} {cy-130*s} '
         f'C {cx-70*s} {cy-260*s}, {cx+120*s} {cy-270*s}, {cx+140*s} {cy-130*s} '
         f'C {cx+230*s} {cy-180*s}, {cx+330*s} {cy-90*s}, {cx+290*s} {cy-10*s} '
         f'C {cx+380*s} {cy+20*s}, {cx+370*s} {cy+130*s}, {cx+270*s} {cy+130*s} '
         f'C {cx+100*s} {cy+165*s}, {cx-100*s} {cy+165*s}, {cx-260*s} {cy+120*s} Z')
    return (f'<defs><radialGradient id="cl-{uid}" cx="0.4" cy="0.3" r="0.8"><stop offset="0" stop-color="#ffffff"/>'
            f'<stop offset="1" stop-color="#E6E1D9"/></radialGradient></defs>'
            f'<ellipse cx="{cx}" cy="{cy+200*s}" rx="{330*s}" ry="{38*s}" fill="#4d3b30" opacity="0.2" filter="url(#bl-{uid})"/>'
            f'<rect x="{cx-120*s}" y="{cy+120*s}" width="{26*s}" height="{70*s}" rx="{13*s}" fill="#3a3633"/>'
            f'<rect x="{cx+95*s}" y="{cy+120*s}" width="{26*s}" height="{70*s}" rx="{13*s}" fill="#3a3633"/>'
            f'<path d="{d}" fill="url(#cl-{uid})"/>'
            f'<circle cx="{cx-70*s}" cy="{cy-10*s}" r="{11*s}" fill="#3a3633"/>'
            f'<circle cx="{cx+70*s}" cy="{cy-10*s}" r="{11*s}" fill="#3a3633"/>'
            f'<path d="M {cx-30*s} {cy+30*s} Q {cx} {cy+55*s} {cx+30*s} {cy+30*s}" stroke="#3a3633" stroke-width="{6*s}" fill="none" stroke-linecap="round"/>'
            f'<ellipse cx="{cx-120*s}" cy="{cy+25*s}" rx="{26*s}" ry="{12*s}" fill="#F2C9C3" opacity="0.6"/>'
            f'<ellipse cx="{cx+120*s}" cy="{cy+25*s}" rx="{26*s}" ry="{12*s}" fill="#F2C9C3" opacity="0.6"/>')


NUV = {'tosca-white': '#EFE9DF', 'grey': '#A3A09D', 'charcoal': '#55555A', 'coffee': '#A88C72', 'sage': '#A9B79B', 'pink': '#DDB0B4'}
NOOK = {'light-grey': '#77777B', 'navy': '#2F3756', 'pink': '#E2B8BD'}

# Only the Nimbus™ gift still uses a drawn placeholder; product photos are real.
scenes = {'nimbus.svg': frame('n', cloud('n', 500, 640, 1.1), bg='#E9DFD2')}

os.makedirs(OUT, exist_ok=True)
for name, svg in scenes.items():
    with open(os.path.join(OUT, name), 'w') as f:
        f.write(svg)
    print('wrote', name, len(svg) // 1024, 'KB')
