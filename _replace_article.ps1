$f = 'c:\Users\Reinaldo\Desktop\SOSSEO_sites\fgcar-funilaria\conserto-apos-batida-passo-a-passo-completo.html'
$c = Get-Content $f -Raw -Encoding UTF8

$c = $c.replace('Por que Adiar um Reparo de Funilaria Pode Sair Muito Mais Caro Depois? | FG Car Oficina Osasco', 'Conserto após Batida: Passo a Passo Completo da Funilaria | FG Car')
$c = $c.replace('Descubra por que postergar o conserto de um amassado ou arranhão pode triplicar o custo da oficina: oxidação oculta, desvalorização e perda da chapa original!', 'Descubra o passo a passo completo do conserto após batida: da avaliação dos danos estruturais à pintura em estufa climatizada. Conte com a FG Car em Osasco!')
$c = $c.replace('https://funilariaosasco.com.br/por-que-adiar-reparo-de-funilaria-sai-mais-caro', 'https://funilariaosasco.com.br/conserto-apos-batida-passo-a-passo-completo')
$c = $c.replace('images/adiar-reparo-de-funilaria-capa.jpg', 'images/conserto-apos-batida-passo-a-passo-capa.webp')
$c = $c.replace('images/conserto-apos-batida-passo-a-passo-capa.webp" alt="Especialista', 'images/conserto-apos-batida-passo-a-passo-capa.webp" alt="Conserto')
$c = $c.replace('Inspeção técnica detalhada de oxidação iniciada sob o verniz rompido na oficina FG Car em Osasco', 'Conserto após Batida: Passo a Passo Completo da Funilaria Automotiva na FG Car em Osasco')
$c = $c.replace('09/10/2026', '31/10/2026')
$c = $c.replace('Por que Adiar um Reparo de Funilaria Pode Sair Muito Mais Caro Depois?', 'Conserto após Batida: O Passo a Passo Completo da Funilaria Automotiva')
$c = $c.replace('Por que Adiar Funilaria Sai Mais Caro? | FG Car Osasco', 'Conserto após Batida: Passo a Passo Completo da Funilaria | FG Car')
$c = $c.replace('por que adiar reparo de funilaria sai mais caro', 'conserto após batida')
$c = $c.replace('por-que-adiar-reparo-de-funilaria-sai-mais-caro', 'conserto-apos-batida-passo-a-passo-completo')

Set-Content $f $c -Encoding UTF8
Write-Output 'Done'