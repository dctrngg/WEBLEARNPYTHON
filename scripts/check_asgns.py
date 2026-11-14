import re

with open('src/services/seedData.ts', 'r', encoding='utf-8') as f:
    text = f.read()

lines = [l.strip() for l in text.split('\n') if l.strip().startswith('id: "asgn_')]
print('Assignments in seedData.ts:', len(lines))
for l in lines:
    print(' ', l)
