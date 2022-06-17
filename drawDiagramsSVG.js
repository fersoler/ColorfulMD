
color1 = "#696967";//"#095119";

function scale(x, xMin, xMax, yMin, yMax){
    return ((x - xMin) / (xMax - xMin)) * (yMax - yMin) + yMin;
};

function colorNum(n){
    var r = 0;
    var g = 0;
    var b = 0; 
    if(n<-0.5){
        r = 255;
        g = Math.floor(scale(n,-1,-0.5,0,165));
        b = 0;
    } else {
        if(n<0){
            r = 255;
            g = Math.floor(scale(n,-0.5,0,165,255));
            b = 0;
        } else { 
            if(n<0.5){
                r = Math.floor(scale(n,0,0.5,255,0));
                g = Math.floor(scale(n,0,0.5,255,128));
                b = 0;
            } else {
                r = 0;
                g = Math.floor(scale(n,0.5,1,128,0));
                b = Math.floor(scale(n,0.5,1,0,255));
            }
        }
    };
    return "rgb(" + r + "," + g + "," + b + ")";
};

function drawDiagram(diag, xp, yp, panel, dn, dText, dText2 = ""){
    var element;
    var coords;
    var path;
    cD = diag.colorD;
    cS = diag.colorS;
    cI = diag.colorI;
    dS = diag.sub;
    dA = diag.all;
    dI = diag.in;
    dO = diag.out;
    drawText(`D${dn}: ${dText}`, xp, yp+90, "white","middle",panel);
    drawText(dText2, xp, yp+120, "white", "middle",panel);
    switch(dI.length){
        case 1:
            drawEllipse(xp,yp,colorNum(cD),panel);
            drawText(dS,xp,yp,colorNum(cS),"middle",panel);
            drawEllipseOut(dO,xp,yp,colorNum(0),panel);
            drawText(union(dA,dI[0]).join(''),xp,yp+40,colorNum(cI[0]),"middle",panel);
            break;
        case 2:
            drawEllipse(xp,yp,colorNum(cD),panel);
            drawEllipseBars(xp,yp,colorNum(cD),panel);
            drawText(dS,xp,yp,colorNum(cS),"middle",panel);
            drawEllipseOut(dO,xp,yp,colorNum(0),panel);
            drawText(union(dA,dI[0]).join(''),xp,yp-40,colorNum(cI[0]),"middle",panel);
            drawText(union(dA,dI[1]).join(''),xp,yp+40,colorNum(cI[1]),"middle",panel);
            break;
        case 3:
            drawTriangle(xp,yp,colorNum(cD),panel);
            drawText(dS,xp,yp+20,colorNum(cS),"middle",panel);
            drawTriangleOut(dO,xp,yp,colorNum(0),panel);        
            drawTextRotEmp(union(dA,dI[0]).join(''),xp+25,yp+5,colorNum(cI[0]),"middle",60,panel);
            drawTextRotEmp(union(dA,dI[1]).join(''),xp-25,yp+5,colorNum(cI[1]),"middle",-60,panel);   
            drawTextRotEmp(union(dA,dI[2]).join(''),xp,yp+60,colorNum(cI[2]),"middle",0,panel);   
            break;
        case 4:
            drawSquare(xp,yp,colorNum(cD),panel);
            drawText(dS,xp,yp,colorNum(cS),"middle",panel);
            drawSquareOut(dO,xp,yp,colorNum(0),panel);
            drawTextRotEmp(union(dA,dI[0]).join(''),xp+55,yp,colorNum(cI[0]),"middle",90,panel);
            drawTextRotEmp(union(dA,dI[1]).join(''),xp-55,yp,colorNum(cI[1]),"middle",-90,panel);
            drawTextRotEmp(union(dA,dI[2]).join(''),xp,yp+55,colorNum(cI[2]),"middle",0,panel);
            drawTextRotEmp(union(dA,dI[3]).join(''),xp,yp-55,colorNum(cI[3]),"middle",0,panel);
            break;
        case 5:
            drawPentagon(xp,yp,colorNum(cD),panel);
            var yp2 = yp+7.39;
            drawText(dS,xp,yp2,colorNum(cS),"middle",panel);
            var r = 48;
            var c1 = 0.25*r*(Math.sqrt(5)-1);
            var c2 = 0.25*r*(Math.sqrt(5)+1);
            var s1 = 0.25*r*Math.sqrt(10+2*Math.sqrt(5));
            var s2 = 0.25*r*Math.sqrt(10-2*Math.sqrt(5));
            var yp2 = yp+7.39;
            drawPentagonOut(dO,xp,yp,colorNum(0),panel);
            drawTextRotEmp(union(dA,dI[0]).join(''),xp+s2,yp2-c2,colorNum(cI[0]),"middle",35,panel);
            drawTextRotEmp(union(dA,dI[1]).join(''),xp+s1,yp2+c1,colorNum(cI[1]),"middle",-70,panel);
            drawTextRotEmp(union(dA,dI[2]).join(''),xp,yp2+r,colorNum(cI[2]),"middle",0,panel);
            drawTextRotEmp(union(dA,dI[3]).join(''),xp-s1,yp2+c1,colorNum(cI[3]),"middle",70,panel);
            drawTextRotEmp(union(dA,dI[4]).join(''),xp-s2,yp2-c2,colorNum(cI[4]),"middle",-35,panel);
            break;
        default:
            drawText(`Subj: ${dS}`,xp-60,yp-46,"white","start",panel);
            drawText(`All: ${showStrSet(dA)}`,xp-60,yp-21,"white","start",panel);
            drawText(`In: ${showInStr(dI.slice(0,2))},`,xp-60,yp+4,"white","start",panel);
            drawText(`${showInStr(dI.slice(2))}`,xp-60,yp+29,"white","start",panel);
            drawText(`Out: ${showStrSet(dO)}`,xp-60,yp+54,"white","start",panel);            
    }    
};

function showStrSet(strSet){
    return `{${strSet.join()}}`;
};

function showInStr(inPart){
    return inPart.map(x => `{${x.join()}}`).join()
};

function drawEllipse(xp,yp,color,panel){
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    element.setAttributeNS(null, 'cx', xp);
    element.setAttributeNS(null, 'cy', yp);
    element.setAttributeNS(null, 'rx', 50);
    element.setAttributeNS(null, 'ry', 70);
    element.setAttributeNS(null, 'style', `fill-opacity:0;stroke:${color};stroke-width:3`);
    panel.appendChild(element);
};

function drawTriangle(xp,yp,color,panel){
    lado = 2*140/Math.sqrt(3);
    var thePoints = `${xp}, ${yp-70} ${xp+(lado/2)}, ${yp+70} ${xp-(lado/2)}, ${yp+70}`;
    var figure = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    figure.setAttributeNS(null, 'stroke', color);
    figure.setAttributeNS(null, 'stroke-width', 3);
    figure.setAttributeNS(null, 'points', thePoints);
    figure.setAttributeNS(null, 'fill', "url(#gradient)");
    figure.setAttributeNS(null, 'opacity', 1.0);
    panel.appendChild(figure);
};



function drawSquare(xp,yp,color,panel){
    var thePoints = `${xp-70}, ${yp-70} ${xp+70}, ${yp-70} ${xp+70}, ${yp+70} ${xp-70}, ${yp+70}`;
    var figure = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    figure.setAttributeNS(null, 'stroke', color);
    figure.setAttributeNS(null, 'stroke-width', 3);
    figure.setAttributeNS(null, 'points', thePoints);
    figure.setAttributeNS(null, 'fill', "url(#gradient)");
    figure.setAttributeNS(null, 'opacity', 1.0);
    panel.appendChild(figure);
};

function drawPentagon(xp,yp,color,panel){
    var r = 77.39;
    var c1 = 0.25*r*(Math.sqrt(5)-1);
    var c2 = 0.25*r*(Math.sqrt(5)+1);
    var s1 = 0.25*r*Math.sqrt(10+2*Math.sqrt(5));
    var s2 = 0.25*r*Math.sqrt(10-2*Math.sqrt(5));
    var yp2 = yp+7.39;

    var thePoints = `${xp}, ${yp2-r} ${xp+s1}, ${yp2-c1} ${xp+s2}, ${yp2+c2} ${xp-s2}, ${yp2+c2} ${xp-s1}, ${yp2-c1}`;
    var figure = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    figure.setAttributeNS(null, 'stroke', color);
    figure.setAttributeNS(null, 'stroke-width', 3);
    figure.setAttributeNS(null, 'points', thePoints);
    figure.setAttributeNS(null, 'fill', "url(#gradient)");
    figure.setAttributeNS(null, 'opacity', 1.0);
    panel.appendChild(figure);
};



function drawEllipseBars(xp,yp,color,panel){
    // Líneas horizontales
    var coords = `M ${xp - 50}, ${yp}`;
    coords += " l 30, 0";
    coords += " m 40, 0";
    coords += " l 30, 0";
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttributeNS(null, 'stroke', color);
    path.setAttributeNS(null, 'stroke-width', 3);
    path.setAttributeNS(null, 'd', coords);
    path.setAttributeNS(null, 'fill', "url(#gradient)");
    path.setAttributeNS(null, 'opacity', 1.0);
    panel.appendChild(path);
};

function drawText(dS,xp,yp,color,alignHor,panel){
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    element.setAttributeNS(null, 'x', xp);
    element.setAttributeNS(null, 'y', yp);
    element.setAttributeNS(null, 'stroke', color);
    element.setAttributeNS(null, 'fill', color);
    element.setAttributeNS(null, 'alignment-baseline', "middle"); // Vert
    element.setAttributeNS(null, 'text-anchor', alignHor); // Hor
    element.setAttributeNS(null, 'font-family', "Verdana");
    element.setAttributeNS(null, 'font-size', 25);
    element.textContent = dS;
    panel.appendChild(element);
};

function drawTextRotEmp(dS,xp,yp,color,alignHor,angle,panel){
    var texto = dS;
    if(dS.length == 0){
        texto = "?";
    }
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    element.setAttributeNS(null, 'x', xp);
    element.setAttributeNS(null, 'y', yp);
    element.setAttributeNS(null, 'stroke', color);
    element.setAttributeNS(null, 'fill', color);
    element.setAttributeNS(null, 'alignment-baseline', "middle"); // Vert
    element.setAttributeNS(null, 'text-anchor', alignHor); // Hor
    element.setAttributeNS(null, 'transform', `rotate(${angle}, ${xp}, ${yp})`); // Prueba de rotar
    element.setAttributeNS(null, 'font-family', "Verdana");
    element.setAttributeNS(null, 'font-size', 25);
    element.textContent = texto;
    panel.appendChild(element);
};


function drawEllipseOut(dO,xp,yp,color,panel){
    inc = 30;
    rx = inc+50;
    ry = inc+70;
    frac = 8;
    var init = Math.PI/5;
    if(dO.length > 4){
	init = Math.PI/3;
    };
    for(var i=0; i<dO.length; i++){
        drawText(`${dO[i]}?`,xp+(rx*Math.cos(init-(i*Math.PI/frac))),yp-(ry*Math.sin(init-(i*Math.PI/frac))),color,"middle",panel);
    };
};

function drawTriangleOut(dO,xp,yp,color,panel){
    for(var i=0; i<dO.length; i++){
        drawText(`${dO[i]}?`,xp+60+1.4*(i*10),yp-60+1.4*(i*22),color,"end",panel);
    };
};

function drawSquareOut(dO,xp,yp,color,panel){
    for(var i=0; i<dO.length; i++){
        drawText(`${dO[i]}?`,xp+120,yp-60+1.4*(i*22),color,"end",panel);
    };
};


function drawPentagonOut(dO,xp,yp,color,panel){

    var r = 107.39;
    var c1 = 0.25*r*(Math.sqrt(5)-1);
    var c2 = 0.25*r*(Math.sqrt(5)+1);
    var s1 = 0.25*r*Math.sqrt(10+2*Math.sqrt(5));
    var s2 = 0.25*r*Math.sqrt(10-2*Math.sqrt(5));
    var yp2 = yp+10.39;

    var p1 = [xp, yp2-r];
    var p2 = [xp+s1, yp2-c1];
    var p3 = [xp+s2, yp2+c2];
    var p4 = [xp-s2, yp2+c2];
    var p5 = [xp-s1, yp2-c1];

    var pos = [];
    pos[0] = getIntermediatePoint(p1,p2,0.33);
    pos[1] = getIntermediatePoint(p2,p1,0.33);
    pos[2] = getIntermediatePoint(p1,p5,0.33);
    pos[3] = getIntermediatePoint(p5,p1,0.33);
    pos[4] = getIntermediatePoint(p2,p3,0.33);
    pos[5] = getIntermediatePoint(p3,p2,0.33);
    pos[6] = getIntermediatePoint(p5,p4,0.33);
    pos[7] = getIntermediatePoint(p4,p5,0.33);
    
    for(var i=0; i<dO.length && i<8; i++){
        drawText(`${dO[i]}?`,pos[i][0],pos[i][1],color,"middle",panel);
    };

    for(var i=8; i<dO.length; i++){
        drawText(`${dO[i]}?`,xp+130,yp-60+1.4*((i-8)*22),color,"end",panel);
    };


};

function getIntermediatePoint(p1,p2,portion){
    var ptx = p1[0]+portion*(p2[0]-p1[0]);
    var pty = p1[1]+portion*(p2[1]-p1[1]);
    return [ptx,pty];
}
