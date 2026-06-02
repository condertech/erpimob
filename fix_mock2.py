import re

f = open('src/data/mock.ts', 'rb')
d = f.read()
f.close()
text = d.decode('utf-8')

# Fix enderecos: number" WORD -> number - WORD (dash was removed by previous cleanup)
text = re.sub(r'(\d+)" (Centro)', r'\1 - \2', text)
text = re.sub(r'(Bloco [A-Z])" (Centro)', r'\1 - \2', text)
text = re.sub(r'(\d+)" (Bela)', r'\1 - \2', text)
text = re.sub(r'(\d+)" (Consola)', r'\1 - \2', text)
text = re.sub(r'(\d+)" (Vila)', r'\1 - \2', text)

# Fix email bodies: Imovel: AP-101 " Rua
text = re.sub(r'(AP-\d+) " (Rua)', r'\1 - \2', text)

# Fix assuntos with " separador
text = re.sub(r' " (Junho|Maio|Junho|AP-|15/)', r' - \1', text)

# Remove any leftover \r inside lines (extra CR from mixed line endings)
text = text.replace('\r\r\n', '\r\n')

print('FFFD remaining:', text.count('\ufffd'))
print('Stray quote patterns remaining:', len(re.findall(r'\d+" [A-Z]', text)))

with open('src/data/mock.ts', 'wb') as out:
    out.write(text.encode('utf-8'))
print('Done.')
