var loadImages; // define a variavel que vai ser uma função

$(document).ready(function(){
	$(".lazy-img img").on("load", function(){ // quando a img dentro de .lazy-img termina de ser carregada executa o código abaixo
		$(this).addClass("loaded"); // this representa a própria imagem, e é adicionado a classe css "loaded"
	});

	$(document).on("scroll", function(){
		loadImages(); // quando ocorre o scroll, chamo loadImages
	});

	(loadImages = function(){ // loadImages recebe uma função
		$.each($(".lazy-img"), function(){ // each ("iti") vai percorrer todos os blocos que tiver a classe lazy-img, e para cada bloco executa os códigos abaixo
			var block = $(this); // var block recebe o conteudo que tá dentro da classe .lazy-img
			var image = block.find("img"); // var image procura as tags img que estão dentro das divs com classe .lazy-img

			// o if abaixo garante que quando rolar a página a imagem não fique sendo atualizada/carregada constantemente; uma vez que o src da img for setado, não ficará trocando ao dar scroll
			if (isOnScreen(block)) { // função isOnScreen p/ verificar se a imagem esta aparecendo na área útil de visão do monitor
				var url = image.data("url"); // var url recebe informações do atributo data-url das tags img

				if(image.attr("src") != url){ // se o atributo src for diferente da informação em data-url, executa a linha abaixo
					image.attr("src", url); // define o src da img com o conteúdo de data-url
				};
			}
		});
	})(); // este parenteses significa que assim que a função é lida pelo navegador ela já é executada
});

function isOnScreen(element){ // função booleana
	var win = $(window); // capta o tamanho da pagina inteira
	var screenTop = win.scrollTop(); // capta o pixel onde começa a área útil de visualização da página
	var screenBottom = screenTop + win.height(); // capta o pixel onde termina a área útil de visualização da página
	var elementTop = element.offset().top; // capta o pixel onde começa o elemento em relação ao tamanho da página inteira (win)
	var elementBottom = elementTop + element.height(); // capta o pixel onde termina o elemento, soma com elementTop sabendo então a sua altura
	return elementBottom > screenTop && elementTop < screenBottom; // se o fim do elemento for maior que o começo da área útil de visualização da win E se o começo do elemento for menor que o fim da área útil de visualização da win, retorna TRUE
}