"""Builds index.html (links assets/) and preview.html (images inlined) from src/page.html."""
import base64, mimetypes, os, sys
ROOT = os.path.dirname(os.path.abspath(__file__))
src = open(os.path.join(ROOT, 'src', 'page.html'), encoding='utf-8').read()

PARTNERS = [  # file, css class, name
    ('eagles.png', 'tall', 'Eagles Developments'),
    ('tucano.png', 'short', 'Tucano'), ('marefa.svg', '', 'Marefa'),
    ('rgc.svg', '', 'RGC'), ('alnour.png', 'short', 'Alnour Optical'),
    ('plaza.svg', '', 'Plaza'), ('moltqa.svg', 'tall', 'Moltqa'), ('fix.svg', 'tall', 'FIX'),
]

def build(inline):
    def ref(rel):
        if not inline: return rel
        mime = mimetypes.guess_type(rel)[0] or ('image/svg+xml' if rel.endswith('.svg') else 'application/octet-stream')
        data = base64.b64encode(open(os.path.join(ROOT, rel), 'rb').read()).decode()
        return f'data:{mime};base64,{data}'
    def logos(alt):
        return '\n              '.join(
            f'<img src="{ref("assets/partners/" + f)}" alt="{"" if not alt else n}"{" class=" + chr(34) + c + chr(34) if c else ""} loading="lazy">'
            for f, c, n in PARTNERS)
    # wordmark is always inlined: CSS masks refuse cross-origin files, including file://
    wm = 'data:image/png;base64,' + base64.b64encode(open(os.path.join(ROOT, 'assets/wordmark.png'), 'rb').read()).decode()
    out = (src.replace('{{WORDMARK}}', wm)
              .replace('{{BOARD}}', ref('assets/boardroom.jpg'))
              .replace('{{PARTNERS}}', logos(True))
              .replace('{{PARTNERS_DUP}}', logos(False)))
    assert '{{' not in out
    return out

open(os.path.join(ROOT, 'index.html'), 'w', encoding='utf-8').write(
    '<!doctype html>\n<html lang="en" dir="ltr">\n<head>\n<meta charset="utf-8">\n'
    '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
    + build(False).replace('<style>', '<style>\n[hidden]{display:none!important}', 1)
      .replace('</style>\n', '</style>\n</head>\n<body>\n', 1)
    + '\n</body>\n</html>\n')
if len(sys.argv) > 1:
    open(sys.argv[1], 'w', encoding='utf-8').write(build(True))
print('built')
