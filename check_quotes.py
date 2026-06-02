import re

f = open('src/data/mock.ts', 'rb')
d = f.read()
f.close()
text = d.decode('utf-8')

for m in re.finditer(r'\d+" [A-Z]', text):
    start = max(0, m.start() - 40)
    end = min(len(text), m.end() + 40)
    print(repr(text[start:end]))
    print('---')
