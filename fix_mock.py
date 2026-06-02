import re

with open('src/data/mock.ts', 'rb') as f:
    d = f.read()

text = d.decode('utf-8', 'replace')
print(f"FFFD before: {text.count(chr(0xFFFD))}")

R = chr(0xFFFD)

# 1. Limpar separadores de linha tipo // FFFD...FFFD Texto FFFD...
text = re.sub(r'// ' + R + r'[^A-ZÀ-ÿa-z\n]*?(Prédios / Blocos)[^\n]*', '// Prédios / Blocos', text)
text = re.sub(r'// ' + R + r'[^A-ZÀ-ÿa-z\n]*?(Imóveis)[^\n]*', '// Imóveis - gerados automaticamente (4 blocos x 5 andares x 10 aptos = 200)', text)
text = re.sub(r'// ' + R + r'[^A-ZÀ-ÿa-z\n]*?(Inquilinos)[^\n]*', '// Inquilinos', text)
text = re.sub(r'// ' + R + r'[^A-ZÀ-ÿa-z\n]*?(Proprietários)[^\n]*', '// Proprietários', text)
text = re.sub(r'// ' + R + r'[^A-ZÀ-ÿa-z\n]*?(Contratos)[^\n]*', '// Contratos', text)
text = re.sub(r'// ' + R + r'[^A-ZÀ-ÿa-z\n]*?(Cobranças)[^\n]*', '// Cobranças', text)
text = re.sub(r'// ' + R + r'[^A-ZÀ-ÿa-z\n]*?(Chamados)[^\n]*', '// Chamados de Manutenção', text)
text = re.sub(r'// ' + R + r'[^A-ZÀ-ÿa-z\n]*?(Vagas)[^\n]*', '// Vagas de Garagem', text)
text = re.sub(r'// ' + R + r'[^A-ZÀ-ÿa-z\n]*?(WhatsApp)[^\n]*', '// WhatsApp', text)
text = re.sub(r'// ' + R + r'[^A-ZÀ-ÿa-z\n]*?(Emails)[^\n]*', '// Emails', text)
text = re.sub(r'// ' + R + r'[^A-ZÀ-ÿa-z\n]*?(Dashboard)[^\n]*', '// Dashboard', text)
# resto de separadores que nao casaram
text = re.sub(r'// ' + R + r'[^\n]*', '//', text)

# 2. Prefixos de conteudo em strings – tipo "FFFD..." no inicio
# Padrões: "FFFD[stuff] Olá" → "Olá"
text = re.sub('"' + R + r'[^\s"]{0,15}\s+(Olá)', r'"\1', text)
text = re.sub('"' + R + r'[^\s"]{0,15}\s+(Atenção)', r'"\1', text)
text = re.sub('"' + R + r'[^\s"]{0,15}\s+(Prezado)', r'"\1', text)
text = re.sub('"' + R + r'[^\s"]{0,15}\s+(Pagamento)', r'"\1', text)
text = re.sub('"' + R + r'[^\s"]{0,15}\s+(Recebido)', r'"\1', text)

# 3. Linhas dentro de strings tipo \n\nFFFFD... Valor:
text = re.sub(r'\\n\\n' + R + r'[^\s"\\]{0,12}\s+(Valor)', r'\\n\\n\1', text)
text = re.sub(r'\\n' + R + r'[^\s"\\]{0,12}\.?\s+(Valor)', r'\\n\1', text)
text = re.sub(r'\\n' + R + r'[^\s"\\]{0,12}\.?\s+(Vencimento)', r'\\n\1', text)
text = re.sub(r'\\n' + R + r'[^\s"\\]{0,12}\.?\s+(Multa)', r'\\nMulta', text)
text = re.sub(r'\\n' + R + r'[^\s"\\]{0,12}\.?\s+(Juros)', r'\\nJuros', text)
text = re.sub(r'\\n' + R + r'[^\s"\\]{0,12}\.?\s+(Total)', r'\\nTotal', text)
text = re.sub(r'\\n' + R + r'[^\s"\\]{0,12}\.?\s+(Link)', r'\\nLink', text)
text = re.sub(r'\\n' + R + r'[^\s"\\]{0,12}\.?\s+(Imóvel)', r'\\nImóvel', text)

# 4. Sufixo de string – tipo "...Obrigado! FFFD[stuff]"
text = re.sub(r' ' + R + r'[^\s"]{0,15}"', '"', text)
text = re.sub(r' ' + R + r'[^\s`]{0,15}`', '`', text)

# 5. Assuntos de email com -" no lugar de -
text = text.replace(' -" ', ' - ')

# 6. Qualquer FFFD isolado restante
text = re.sub(R + r'[^\s"\'`\\,\n]*', '', text)

remaining = text.count(chr(0xFFFD))
print(f"FFFD after: {remaining}")

with open('src/data/mock.ts', 'w', encoding='utf-8', newline='\r\n') as out:
    out.write(text)
print("Done.")
