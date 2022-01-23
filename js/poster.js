
    var poster = document.getElementById("final");
    var buttonGradientColor = document.getElementById("gradientColor");
    poster.style.backgroundImage = "none";
    var premiereColor = 'FFF';
    var mesDivs = document.getElementsByClassName("item-grille");
    localStorage.clear();

    $(".param li").slideUp();


    //////////////////////////////
    //   couleur de fond        //
    //////////////////////////////
    /*
    function activeBg(){
        $(".bgColor li").slideDown();
        backgroundColor();
    }

    function desactBg(){
        $(".bgColor li").slideUp();
        poster.style.backgroundColor = "transparent";
    }

    var selecteurbg = document.getElementById("couleurFond");
    function backgroundColor(){    
        var bgSelectionne = selecteurbg.options[selecteurbg.selectedIndex].value;
        console.log( "Ma couleur de fond est: " + bgSelectionne);
        poster.style.backgroundColor = bgSelectionne;
        
        for(i=0; i>mesDivs.length; i++){
            mesDivs[i].style.backgroundImage = "none";
            mesDivs[i].style.background = "none";
        }
    }
    */

    //////////////////////////////
    //   activer les bordures   //
    //////////////////////////////
    var mesDivs = document.getElementsByClassName("item-grille");
    var btnActive = document.getElementById("activeDegrade");
    var btnDesac = document.getElementById("desacDegrade");
    var epaisseurBorder = document.getElementById("widthBorder");
    var couleurBorder = localStorage.userColorBorder;


    //active les bordures
    btnActive.oninput = function (){
        $(".border li").slideDown();
        for ( i = 0; i < mesDivs.length; i++){
            localStorage.actBorder = "on";
            var enterUserWidth = localStorage.widthBorder;
            mesDivs[i].style.border = enterUserWidth + "px solid " + couleurBorder;
        }
    }
    //desactive les bordures
    btnDesac.oninput = function (){
        $(".border li").slideUp();
        for (i = 0; i < mesDivs.length; i++){
            localStorage.actBorder = "off";
            mesDivs[i].style.border = "none";
        }
    }
    //epaisseur des bordures
    epaisseurBorder.oninput = function (){
        var userWidth = epaisseurBorder.value;
        localStorage.widthBorder = userWidth;
        resultat();
    }
    //couleurBorder
    function colorBorder(userColor){
        var valeurColor = "#" + userColor;
        localStorage.userColorBorder = valeurColor;
        resultat();                
    }



    //////////////////////////////
    //   système de grid        //
    //////////////////////////////

    //var
    var containerGrille = document.getElementById("grille");
    var column = document.getElementById("containerColumn");
    var row = document.getElementById("containerRow");

    var columnSlider = document.getElementById("sliderColonne");
    var valeurColumn = document.getElementById("afficherColumn");
    valeurColumn.innerHTML = columnSlider.value;

    var rowSlider = document.getElementById("sliderRow");
    var afficherRow = document.getElementById("afficherRow");
    afficherRow.innerHTML = rowSlider.value;

    divGrille = document.createElement("div");
    containerGrille.appendChild(divGrille);
    divGrille.setAttribute('class', 'item-grille'); 
    
    //ouvrir les li

    $(".grille li").slideToggle();

    //colonne
    columnSlider.oninput = function(){
        //mettre valeur dans le storage
        var nombreDeColonne = this.value;
        localStorage.colonne = nombreDeColonne;
        valeurColumn.innerHTML = nombreDeColonne; //afficher la valeur dans le span
        calculDiv();
    }

    //ligne
    rowSlider.oninput = function(){
        //mettre valeur dans le storage
        var nombreDeLigne = this.value;
        localStorage.ligne = nombreDeLigne;
        afficherRow.innerHTML = nombreDeLigne; //afficher la valeur dans le span
        calculDiv();
    }

    //changer le css grid
    function calculDiv(){
        $( ".item-grille" ).remove();
        var colonne = localStorage.colonne;
        var ligne = localStorage.ligne;
        var ligneTotal = colonne * ligne;
        localStorage.numberOfDiv = ligneTotal;


        var auto = "1fr";
        var rowFinal = "";
        var columnFinal = "";

        for(i = 0; i < ligneTotal; i++){ //creer les divs
            divGrille = document.createElement("div");
            containerGrille.appendChild(divGrille);
            divGrille.setAttribute('class', 'item-grille'); 
        }
        for(i = 0; i < colonne; i++){
            //repete auto antant de fois qu'il y a de colonne
            columnFinal = columnFinal + " " + auto;
        }
        for(i = 0; i < ligne; i++){ 
            //repete auto antant de fois qu'il y a de ligne
            rowFinal = rowFinal + " " + auto;                    
        }
        grille.style.gridTemplateColumns = columnFinal;
        grille.style.gridTemplateRow = rowFinal;
        resultat();
    }


    //////////////////////////////
    //   gestion du dégradé     //
    //////////////////////////////

    $(".degrade li").slideToggle();

    //récupérer la couleur 1
    function color1(color1){
        var couleur1 = "#" + color1;
        localStorage.userColor1 = couleur1;
        resultat();
    }
    //gérer le positionnement de la couleur
    var selectOpacity = document.getElementById("opacityColor");
    localStorage.opacityColor1 = "0%";
    function opacityColor(){
        var userOpacity = selectOpacity.options[selectOpacity.selectedIndex].value;
        localStorage.opacityColor1 = userOpacity;
        resultat();
    }

    //récupérer la couleur 1
    function color2(color2){
        var couleur2 = "#" + color2;
        localStorage.userColor2 = couleur2;
        resultat();
    }
    //gérer le positionnement de la couleur
    var selectOpacity2 = document.getElementById("opacityColor2");
    localStorage.opacityColor2 = "100%";

    function opacityColor2(){
        var userOpacity2 = selectOpacity2.options[selectOpacity2.selectedIndex].value;
        localStorage.opacityColor2 = userOpacity2;
        resultat();
    }

    //////////////////////////////
    // dégradé linéal ou radial //
    //////////////////////////////
    function gradientDirection(type){
        localStorage.gradientType = type;
        resultat();
    }

    //////////////////////////////
    // Inclinaison du degradé   //
    //////////////////////////////

    var sliderInclinaison = document.getElementById("sliderInclinaison");
    var valeurInclinaison = document.getElementById("afficherInclinaison");
    valeurColumn.innerHTML = sliderInclinaison.value;

    sliderInclinaison.oninput = function(){
        //mettre valeur dans le storage
        var InclinaisonDegrade = this.value;
        localStorage.inclinaison = InclinaisonDegrade;
        valeurInclinaison.innerHTML = InclinaisonDegrade; //afficher la valeur dans le span
        calculDiv();
    }

    //////////////////////////////
    // fonction synchronisation //
    //////////////////////////////
    function resultat(){
        var x = localStorage.userColor1;
        var opacityX = localStorage.opacityColor1;
        
        var y = localStorage.userColor2;
        var opacityY = localStorage.opacityColor2;

        var enterUserWidth = localStorage.widthBorder;
        var couleurBorder = localStorage.userColorBorder;

        var inclinaison = localStorage.inclinaison;

        if(localStorage.actBorder == "on"){
            for ( i = 0; i < mesDivs.length; i++){
                mesDivs[i].style.border = enterUserWidth + "px solid " + couleurBorder;

            }
        }else{
            for ( i = 0; i < mesDivs.length; i++){
                mesDivs[i].style.border = "none";
            }
        }
        if(localStorage.gradientType == "radial"){
            for (i=0;i<mesDivs.length;i++){
                mesDivs[i].style.background = "none";
                mesDivs[i].style.backgroundImage = "radial-gradient(" + x + " " + opacityX + ", " + y + " " + opacityY + ")";
                $(".inclinaison").css("display", "none");
            }
        }else{
            for (i=0;i<mesDivs.length;i++){
                $(".inclinaison").css("display", "flex");
                mesDivs[i].style.backgroundImage = "none";
                mesDivs[i].style.background = "linear-gradient(" + inclinaison + "deg, " + x + " " + opacityX + "," + y +" " + opacityY + ")";
            }
        }
    }


    //////////////////////////////
    // Création de la forme     //
    //////////////////////////////
    var selecteurShape = document.getElementById("shape");
    var userShape = document.createElement("div");
    userShape.setAttribute('id', 'forme'); 
    poster.appendChild(userShape);


    function activeForme(){
        $(".forme li").slideDown();
        $("#forme").css("display", "block");
    }
    function desacForme(){
        $(".forme li").slideUp();
        $("#forme").css("display", "none");
        userShape.setAttribute('class', '');            

    }

    //ajouter la class "value" à la div "userShape"
    function addShape(){
        var shapeSelectionne = selecteurShape.options[selecteurShape.selectedIndex].value;
        console.log("ajoute la forme: " + shapeSelectionne);
        userShape.setAttribute('class', shapeSelectionne);            
    }
    //changer le background de la classe
    function shapeColor(jscolor){
        userShape.style.backgroundColor = '#' + jscolor;
    }

    //////////////////////////////
    // Slider                   //
    //////////////////////////////
    var mooveX = document.getElementById("sliderX");
    var mooveY = document.getElementById("sliderY");
    var scale = document.getElementById("sliderScale");
    var rotate = document.getElementById("sliderRotate");

    //déplacement en X
    sliderX.oninput = function() {
        userShape.style.left = sliderX.value + "%";
    }

    //déplacement en Y
    sliderY.oninput = function() {
        userShape.style.top = sliderY.value + "%";
    }

    //modifier la scale
    sliderScale.oninput = function() {
        var shapeSelectionne = selecteurShape.options[selecteurShape.selectedIndex].value;
        
        if(shapeSelectionne == "line"){
            userShape.style.width = sliderScale.value * 10 + "px";
        }else{
            var taille = sliderScale.value * 10;
            userShape.style.width =  taille + "px";
            userShape.style.height =  taille + "px";
        }
    }

    //rotation
    sliderRotate.oninput = function() {
        var degre = sliderRotate.value + "deg";
        userShape.style.transform = "rotate("+ degre +")";
    }

    //opacité de la forme
    var slider = document.getElementById("myRange");
    var output = document.getElementById("demo");
    output.innerHTML = slider.value;

    slider.oninput = function() {
        output.innerHTML = this.value + "%";
        userShape.style.opacity = this.value / 100;
    }


    //////////////////////////////
    // Ajouter le texte         //
    //////////////////////////////
    var selecteurTxt = document.getElementById("msg");
    //gérer la div contenant le texte
    var userTxt = document.createElement("div");
    poster.appendChild(userTxt);
    userTxt.setAttribute('class', 'userTxt');   
    

    function activeTxt(){
        $(".texte li").slideDown();
        $(".userTxt").css("display", "block");
    }
    function desacTxt(){
        $(".texte li").slideUp();
        $(".userTxt").css("display", "none");

    }

    //modifier le style du texte
    var fonts = [
        'Playfair Display',
        'Helvetica',
        'Fira Mono', 
        'Roboto',
        'Avara',
        'Bluu',
        'Gosha',
        'Gosha bold',
        'Monument',
        'Monument bold',
        'Ouroboros',
        'Pt-sans',
        'Trickster',
        'Casa'
    ];
    var max = 200;
    var min = 10;
    localStorage.colorTxt = "fff";
    //récupérer la couleur
    function txtColor(color){
        localStorage.colorTxt = color;
        changeColorTxt();
    }


    selecteurTxt.oninput = function (){
        var size = Math.random() * (max - min) + min;
        var randomFont = fonts[Math.floor(Math.random() * fonts.length)];

        console.log("font size: " + size + " et font familly: " + randomFont);
        userTxt.innerHTML = selecteurTxt.value;
        userTxt.style.fontFamily = randomFont;
        changeColorTxt();
    }

    function changeColorTxt(){
        userTxt.style.color = "#" + localStorage.colorTxt;
    }

    var indicatorOpacityTxt = document.getElementById("writeOpacityTxt");
    var rangeTxtOpacity = document.getElementById("rangeTxtOpacity");

    rangeTxtOpacity.oninput = function (){
        indicatorOpacityTxt.innerHTML = this.value + "%";
        userTxt.style.opacity = this.value / 100;
    }

    var sliderTaille = document.getElementById("rangeTailleTxt");
    var valeurTaille = document.getElementById("AfficherTaille");
    valeurTaille.innerHTML = sliderTaille.value;

    sliderTaille.oninput = function (){
        userTxt.style.fontSize = this.value + "px";
        valeurTaille.innerHTML = this.value
    }

    var mooveTxtX = document.getElementById("sliderTxtX");
    var mooveTxtY = document.getElementById("sliderTxtY");
    var txtRotate = document.getElementById("sliderTxtRotate");

    //déplacement en X
    sliderTxtX.oninput = function() {
        userTxt.style.left = sliderTxtX.value + "%";
    }

    //déplacement en Y
    sliderTxtY.oninput = function() {
        userTxt.style.top = sliderTxtY.value + "%";
    }

    //rotation
    txtRotate.oninput = function() {
        var degre = txtRotate.value + "deg";
        userTxt.style.transform = "rotate("+ degre +")";
    }

    //////////////////////////////
    // random                   //
    //////////////////////////////

    var randomTxt = [
        'Ça va toi?',
        'Toz',
        'Toooooooooooz',
        'Va voir <a href="https://www.instagram.com/thim_ox/" target="_blank"> mon insta </a>',
        'Trop bien ce site, hein ?',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        '',
        'Essaie encore',
        'Create your own poster',
        'Pas mal celui la',
        'Encore',
        'On peut y passer la journée...',
        'skurt'
    ];

    //genere une couleur aléatoire
    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
          color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
      }

      function getRandomNumber(x,y){
        var min = x;
        var max = y;
        var size = Math.round(Math.random() * (max - min) + min);
        return size;
      }
      var nombreFixe = [
        '0', '0', '0', '0', '10', '10', '10',
        '20', '20', '90', '90', '180', '270', '270',
      ];
      var couleurFixe = [
        '#fff', '#fff', 'aqua', 'hotpink', 'orange', '#000', '#000', '#000', 'lightgrey', 'lightgrey'
      ];
      var typeOfGradient = [
          'radial',
          'linear',
          'linear',
          'linear'
      ]
      var pourcentageGrandientOpacity1 = [
        '0%',
        '35%',
        '50%'
    ]
    var pourcentageGrandientOpacity2 = [
        '75%',
        '100%'
    ]
    var formeRandom = [
        'square',
        'circle',
        'circle',
        'line',
        '',
        ''
    ]
    function random(){
        //couleur du dégradé
        localStorage.userColor1 = getRandomColor();
        localStorage.userColor2 = getRandomColor();
        localStorage.inclinaison = getRandomNumber(0, 360);
        localStorage.gradientType =  typeOfGradient[Math.floor(Math.random() * typeOfGradient.length)];
        localStorage.opacityColor1 =  pourcentageGrandientOpacity1[Math.floor(Math.random() * pourcentageGrandientOpacity1.length)];
        localStorage.opacityColor2 =  pourcentageGrandientOpacity2[Math.floor(Math.random() * pourcentageGrandientOpacity2.length)];

        // grille 
        localStorage.colonne = getRandomNumber(1, 10);
        localStorage.ligne = getRandomNumber(1, 12);


        //texte
        var addRandomTxt = randomTxt[Math.floor(Math.random() * randomTxt.length)];
        userTxt.innerHTML = addRandomTxt;
        userTxt.style.fontSize = getRandomNumber(20,100) + "px";
        userTxt.style.left = getRandomNumber(0,20) + "%";
        userTxt.style.top = getRandomNumber(0, 50) + "%";
        var randomRotate = nombreFixe[Math.floor(Math.random() * nombreFixe.length)];
        userTxt.style.transform = "rotate(" + randomRotate + "deg)";
        var randomTxtColor = couleurFixe[Math.floor(Math.random() * couleurFixe.length)];
        userTxt.style.color = randomTxtColor;
        var randomTypo = fonts[Math.floor(Math.random() * fonts.length)];

        userTxt.style.fontFamily = randomTypo;



        //bordure        
        localStorage.widthBorder = "10";
        localStorage.userColorBorder = "#eee";
        for ( i = 0; i < mesDivs.length; i++){
            mesDivs[i].style.border = localStorage.widthBorder + "px solid " + localStorage.userColorBorder;
        }

        //forme 
        randomShape =  formeRandom[Math.floor(Math.random() * formeRandom.length)];
        userShape.setAttribute('class', randomShape);    
        userShape.style.opacity = getRandomNumber(0 , 1);
        userShape.style.backgroundColor = getRandomColor();
        userShape.style.left = getRandomNumber(0 , 80) + "%";
        userShape.style.top = getRandomNumber(0 , 80) + "%";
        userShape.style.transform = "scale(" + getRandomNumber(0.4 , 3) + ")";

        colorBorder();
        calculDiv();
        resultat();
    }

    
    //border
    localStorage.widthBorder = "1";
    localStorage.userColorBorder = "#fff";

    //lancer les fonction des le debut
    localStorage.setItem("colonne","7");
    localStorage.setItem("ligne","1");

    localStorage.setItem("userColor1","#FFD7ED");
    localStorage.setItem("opacityColor1","50%");
    localStorage.setItem("userColor2","#6155FF");
    localStorage.setItem("inclinaison","45");
    localStorage.setItem("actBorder","off");
    localStorage.setItem("widthBorder","10");
    localStorage.setItem("userColorBorder","#000");
    
    userTxt.innerHTML = "à vous de jouer !!"
    userTxt.style.fontFamily = "";
    userTxt.style.fontSize = "40px";
    userTxt.style.color = "#FFD7ED";
    userTxt.style.fontWeight  = "800";
    userTxt.style.left = "50%";
    userTxt.style.transform = "translateX(-50%)";
    userTxt.style.textTransform = "uppercase";
    userTxt.style.top = "10%";

    userShape.setAttribute('class', 'circle');            
    userShape.style.left = "-50px";           
    userShape.style.top = "-50px";           
    userShape.style.opacity = "0.15";           
    userShape.style.transform = "scale(1.5)";           


    calculDiv();
    resultat();


var btn = document.getElementById('download');
var poster = document.getElementById('final');
var options = {
    quality: 0.95 
};

btn.onclick = function() {
domtoimage.toJpeg(poster, options).then(function (dataUrl) {
    console.log("download");
    var link = document.createElement('a');
    link.download = 'mon-poster.jpg';
    link.href = dataUrl;
    link.click();
});
}