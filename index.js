/*jshint esversion: 6 */

$(document).ready(function() {
  // the "href" attribute of the modal trigger must specify the modal ID that wants to be triggered
  $('.modal').modal();
});
// this is to initilize modals ***jam

function NavRtOpen() {
  // $("#mySidenav").css('width', '250px');
  document.getElementById("mainBody").style.marginRight = "250px";
  document.getElementById("mySidenavRt").style.width = "250px";
  // comented below out 7/12
  //     document.getElementById("mainRt").style.marginRight = "250px";
}

function NavRtClose() {
  // document.getElementById("mySidenav").style.width = "0px";
  document.getElementById("mainBody").style.marginRight = "0px";
  document.getElementById("mySidenavRt").style.width = "0px";
  // comented below out 7/12
  // document.getElementById("mainRt").style.marginRight = "0px";
}

// ******************

function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
  document.getElementById("mainBody").style.marginLeft = "250px";
  // document.getElementById("mySidenavRt").style.width = "250px";
  // comented below out 7/12
  // document.getElementById("mainRt").style.marginLeft = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0px";
  document.getElementById("mainBody").style.marginLeft = "0px";
  // document.getElementById("mySidenavRt").style.width = "0px";
  // comented below out 7/12
  // document.getElementById("mainRt").style.marginLeft = "0px";
}

let beers = [];
let beerList = [];
let searchVar = [];
let searchString = '';
let food = '';

(function() {
  'use strict';
  // click event get beers by search type
  $(".getBeers").submit(function(event) {
    event.preventDefault();
    $("#Recipe").empty();
    $("#listings").empty();
    // $("#listings").slideDown("slow");

    var id = $('#searchId').val();
    var name = $('#searchName').val();
    var abv_gt = $('#searchABV_gt').val();
    var abv_lt = $('#searchABV_lt').val();
    var ibu_gt = $('#searchIBU_gt').val();
    var ibu_lt = $('#searchIBU_lt').val();
    var ebc_gt = $('#searchEBC_gt').val();
    var ebc_lt = $('#searchEBC_lt').val();
    var yeast = $('#searchYeast').val();
    var hops = $('#searchHops').val();
    var malt = $('#searchMalt').val();
    var food = $('#searchFood').val();

    // console.log('name: ',name);
    // console.log('id: ',id);

    if (id) {
      searchVar.push('ids=' + id);
    }
    if (name) {
      searchVar.push('beer_name=' + name);
    }
    if (abv_gt) {
      searchVar.push('abv_gt=' + abv_gt);
    }
    if (abv_lt) {
      searchVar.push('abv_lt=' + abv_lt);
    }
    if (ibu_gt) {
      searchVar.push('ibu_gt=' + ibu_gt);
    }
    if (ibu_lt) {
      searchVar.push('ibu_lt=' + ibu_lt);
    }
    if (ebc_gt) {
      searchVar.push('ebc_gt=' + ebc_gt);
    }
    if (ebc_lt) {
      searchVar.push('ebc_lt=' + ebc_lt);
    }
    if (yeast) {
      searchVar.push('yeast=' + yeast);
    }
    if (hops) {
      searchVar.push('hops=' + hops);
    }
    if (malt) {
      searchVar.push('malt=' + malt);
    }
    if (food) {
      searchVar.push('food=' + food);
    }

    searchString = searchVar.join('&');

    // console.log('searchVar: ' + searchVar);
    // console.log('searchString: ' + searchString);

    getBeers(name);
  });

  // end click event get beers by search type end

  const getBeers = function(name) {

    $('.progress').css('visibility', 'visible');

    var $xhr = $.getJSON(`https://api.punkapi.com/v2/beers?${searchString}`);
    // console.log(searchString);
    $xhr.done(function(data) {
      if ($xhr.status !== 200) {
        return;
      }

      // console.log(data);

      beerList = data;

      const newBeers = [];
      for (const item of data) {
        const newItem = {
          id: item.id,
          image_url: item.image_url,
          name: item.name,
          tagline: item.tagline,
          description: item.description,
          abv: item.abv,
          ibu: item.ibu,
          ebc: item.ebc,
          attenuation_level: item.attenuation_level,
          ph: item.ph,
          srm: item.srm,
          ingrediants: item.ingredients,
          hops: item.ingredients.hops,
          malt: item.ingredients.malt,
          yeast: item.ingredients.yeast,
          method: item.method,
          fermentation: item.fermentation,
          mash_temp: item.mash_temp,
          twist: item.twist,
          volume: item.volume,
          food_pairing: item.food_pairing,
          brewers_tips: item.brewers_tips,
          contributed_by: item.contributed_by,
          boil_volume: item.boil_volume,
          first_brewed: item.first_brewed
        };

        for (var thing in newItem) {
          // console.log(newItem[thing]);
          if (newItem[thing] === null) {
            newItem[thing] = "n/a";
          }
          if (newItem.method.twist === null) {
             newItem.method.twist = "n/a";
          }


        }
        // console.log(newItem);
        newBeers.push(newItem);
      }
      beers = newBeers;
      // console.log('beers = ' + beers);
      renderBeers();
      $('.progress').css('visibility', 'hidden');
    });
    searchVar = [];
    searchString = '';
  };

  // start render beers *********************************
  const renderBeers = function() {
    const $listings = $('#listings');
    $('#listings').empty();
    const $ul = $('<ul>');
    $ul.attr("class", "collapsible");
    $ul.attr("data-collapsible", "accordion");


    for (const id in beers) { // beer[id].tagline
      var $li = $('<li>');

      const $liHdr = $('<div class="collapsible-header">').text(beers[id].name);
      $li.append($liHdr);

      const $liBdy = $('<div class="collapsible-body">');
      // const $liBdyText = $('<span>').text(beers[id].tagline);

      const $liRow = $("<div>").attr("class", "row");
      // $liBdy.append($liRow);

      const $liCol1 = $("<div>").attr("class", "col s10");

      // const tagLine = ("Tagline: " + beers[id].tagline);
      const tagLine = (beers[id].tagline);
      const $liBdyTag = $('<div>').text(tagLine);
      $liCol1.append($liBdyTag);

      const $hr = $('<hr>');
      $liCol1.append($hr);

      // const disc = ("Discription: " + beers[id].description);
      const disc = (beers[id].description);
      const $liBdyDisc = $('<div>').text(disc);

      const $table = $("<table>");
      const $trow1 = $("<tr>");

      const abvText = ("ABV: " + beers[id].abv);
      const $abvModal1 = $("<a>").text(abvText).attr({
        class: "modal-close",
        href: "#modal1"
      });
      var $tr1cell1 = $("<td>");
      $tr1cell1.append($abvModal1);
      $trow1.append($tr1cell1);

      const ibuText = ("IBU: " + beers[id].ibu);
      const $ibuModal2 = $("<a>").text(ibuText).attr({
        class: "modal-close",
        href: "#modal2"
      });
      const $tr1cell2 = $("<td>");
      $tr1cell2.append($ibuModal2);
      $trow1.append($tr1cell2);

      const phText = ("PH: " + beers[id].ph);
      const $phModal5 = $("<a>").text(phText).attr({
        class: "modal-close",
        href: "#modal5"
      });
      const $tr1cell3 = $("<td>");
      $tr1cell3.append($phModal5);
      $trow1.append($tr1cell3);
      $table.append($trow1);

      const $trow2 = $("<tr>");

      const ebcText = ("EBC: " + beers[id].ebc);
      const $ebcModal3 = $("<a>").text(ebcText).attr({
        class: "modal-close",
        href: "#modal3"
      });
      const $tr2cell1 = $("<td>");
      $tr2cell1.append($ebcModal3);
      $trow2.append($tr2cell1);

      const srmText = ("SRM: " + beers[id].srm);
      const $srmModal4 = $("<a>").text(srmText).attr({
        class: "modal-close",
        href: "#modal4"
      });
      const $tr2cell2 = $("<td>");
      $tr2cell2.append($srmModal4);
      $trow2.append($tr2cell2);

      const $tr2cell3 = $("<td>");
      const $colorText = $("<span>").text("Color: ");
      $tr2cell3.append($colorText);
      var ebcColor = '';
      beers[id].ebc = Number(beers[id].ebc);
      if (beers[id].ebc < 6) {
        ebcColor = ('colorBtn5');
      } else if (beers[id].ebc < 8) {
        ebcColor = ('colorBtn7');
      } else if (beers[id].ebc < 12) {
        ebcColor = ('colorBtn11');
      } else if (beers[id].ebc < 16) {
        ebcColor = ('colorBtn15');
      } else if (beers[id].ebc < 20) {
        ebcColor = ('colorBtn19');
      } else if (beers[id].ebc < 26) {
        ebcColor = ('colorBtn25');
      } else if (beers[id].ebc < 33) {
        ebcColor = ('colorBtn32');
      } else if (beers[id].ebc < 39) {
        ebcColor = ('colorBtn38');
      } else if (beers[id].ebc < 47) {
        ebcColor = ('colorBtn46');
      } else if (beers[id].ebc < 57) {
        ebcColor = ('colorBtn56');
      } else if (beers[id].ebc < 69) {
        ebcColor = ('colorBtn68');
      } else if (beers[id].ebc < 79) {
        ebcColor = ('colorBtn78');
      } else if (beers[id].ebc === 79) {
        ebcColor = ('colorBtn79');
      } else if (beers[id].ebc > 79) {
        ebcColor = ('colorBtn79');
      }
      const $colorBtn = $("<a>").attr("class", "btn " + ebcColor);

      $tr2cell3.append($colorBtn);

      $trow2.append($tr2cell3);
      $table.append($trow2);

      const $trow3 = $("<tr>");

      const attenlevelText = ("Attenuation level: " + beers[id].attenuation_level);
      const $attenlevelModal6 = $("<a>").text(attenlevelText).attr({
        class: "modal-close",
        href: "#modal6"
      });
      const $tr3cell1 = $("<td>").attr("colspan", "2");
      $tr3cell1.append($attenlevelModal6);
      $trow3.append($tr3cell1);


      var beerId = (id);
      const $tr3cell3 = $("<td>");
      const $recipeBtn = $("<button>").text("Recipe").attr({
        "beerId": id,
        class: "btn btn-small recipe_btn"
      });
      // const $foodBtn = $("<button>").text("Food").attr({
      //   "beerId": id,
      //   class: "btn btn-small food_btn"
      // });
      $tr3cell3.append($recipeBtn);
      // $tr3cell3.append($foodBtn);
      $trow3.append($tr3cell3);

      // const foodPairings = (beers[id].food_pairing);
      // var newFoodPairings =  foodPairings.join(', ');
      // const $foodPair = $('<div>').text("Food Pairings: " + newFoodPairings);

      $table.append($trow3);
      $liBdyDisc.append($table);
      // $liBdyDisc.append($foodPair);

      $liCol1.append($liBdyDisc);
      $liRow.append($liCol1);

      const $liCol2 = $("<div>").attr("class", "col s2");
      const $liImg = $("<img>").attr({
        "src": beers[id].image_url,
        "height": "200px",
        "width": "auto",
        "align": "center"
      });
      // console.log(beer[id].image_url);
      $liCol2.append($liImg);
      $liRow.append($liCol2);

      $liBdy.append($liRow);

      $li.append($liBdy);

      $ul.append($li);
    }
    $listings.append($ul);
    $(document).ready(function() {
      $('.collapsible').collapsible();

      // another click event for recipies ".recipe_btn"
      $(".recipe_btn").click(function() {
        $("#Recipe").empty();
        $("#listings").slideUp("slow");
        const arrNum = $(this).attr("beerId");

        const $row = $('<div>').attr("class", "row");
        const $divS10 = $("<div>").attr("class", "col s10");
        const $divTitle = $("<div>").text(beers[arrNum].name + " ( " + beers[arrNum].tagline + " )").attr("width", "100%").attr("class", " btmMarg");
        $divS10.append($divTitle);
        // const $hr = $('<hr>');
        // $divS10.append($hr);
        const $divDisc = $('<div>').text(beers[arrNum].description);
        $divS10.append($divDisc);




        // start of table ****************************************
        const $table = $("<table>");
        const $trow1 = $("<tr>");

        const abvText = ("ABV: " + beers[arrNum].abv);
        const $abvModal1 = $("<a>").text(abvText).attr({
          class: "modal-close",
          href: "#modal1"
        });
        var $tr1cell1 = $("<td>");
        $tr1cell1.append($abvModal1);
        $trow1.append($tr1cell1);

        const ibuText = ("IBU: " + beers[arrNum].ibu);
        const $ibuModal2 = $("<a>").text(ibuText).attr({
          class: "modal-close",
          href: "#modal2"
        });
        const $tr1cell2 = $("<td>");
        $tr1cell2.append($ibuModal2);
        $trow1.append($tr1cell2);

        const phText = ("PH: " + beers[arrNum].ph);
        const $phModal5 = $("<a>").text(phText).attr({
          class: "modal-close",
          href: "#modal5"
        });
        const $tr1cell3 = $("<td>");
        $tr1cell3.append($phModal5);
        $trow1.append($tr1cell3);
        $table.append($trow1);

        const $trow2 = $("<tr>");

        const ebcText = ("EBC: " + beers[arrNum].ebc);
        const $ebcModal3 = $("<a>").text(ebcText).attr({
          class: "modal-close",
          href: "#modal3"
        });
        const $tr2cell1 = $("<td>");
        $tr2cell1.append($ebcModal3);
        $trow2.append($tr2cell1);

        const srmText = ("SRM: " + beers[arrNum].srm);
        const $srmModal4 = $("<a>").text(srmText).attr({
          class: "modal-close",
          href: "#modal4"
        });
        const $tr2cell2 = $("<td>");
        $tr2cell2.append($srmModal4);
        $trow2.append($tr2cell2);

        const $tr2cell3 = $("<td>");
        const $colorText = $("<span>").text("Color: ");
        $tr2cell3.append($colorText);
        var ebcColor = '';
        beers[arrNum].ebc = Number(beers[arrNum].ebc);
        if (beers[arrNum].ebc < 6) {
          ebcColor = ('colorBtn5');
        } else if (beers[arrNum].ebc < 8) {
          ebcColor = ('colorBtn7');
        } else if (beers[arrNum].ebc < 12) {
          ebcColor = ('colorBtn11');
        } else if (beers[arrNum].ebc < 16) {
          ebcColor = ('colorBtn15');
        } else if (beers[arrNum].ebc < 20) {
          ebcColor = ('colorBtn19');
        } else if (beers[arrNum].ebc < 26) {
          ebcColor = ('colorBtn25');
        } else if (beers[arrNum].ebc < 33) {
          ebcColor = ('colorBtn32');
        } else if (beers[arrNum].ebc < 39) {
          ebcColor = ('colorBtn38');
        } else if (beers[arrNum].ebc < 47) {
          ebcColor = ('colorBtn46');
        } else if (beers[arrNum].ebc < 57) {
          ebcColor = ('colorBtn56');
        } else if (beers[arrNum].ebc < 69) {
          ebcColor = ('colorBtn68');
        } else if (beers[arrNum].ebc < 79) {
          ebcColor = ('colorBtn78');
        } else if (beers[arrNum].ebc === 79) {
          ebcColor = ('colorBtn79');
        } else if (beers[arrNum].ebc > 79) {
          ebcColor = ('colorBtn79');
        }
        const $colorBtn = $("<a>").attr("class", "btn " + ebcColor);

        $tr2cell3.append($colorBtn);

        $trow2.append($tr2cell3);
        $table.append($trow2);

        const $trow3 = $("<tr>");

        const attenlevelText = ("Attenuation level: " + beers[arrNum].attenuation_level);
        const $attenlevelModal6 = $("<a>").text(attenlevelText).attr({
          class: "modal-close",
          href: "#modal6"
        });
        const $tr3cell1 = $("<td>").attr("colspan", "2");
        $tr3cell1.append($attenlevelModal6);

        $trow3.append($tr3cell1);

        const $tr3cell3 = $("<td>");
        const $foodBtn = $("<button>").text("Food").attr({
          "beerId": beerId,
          class: "btn btn-small food_btn"
        }); //.text("close").on('click', closeNav()).on('click',NewRtOpen());
        $tr3cell3.append($foodBtn);
        $trow3.append($tr3cell3);

        $table.append($trow3);
        $divS10.append($table);
        // $liBdyDisc.append($foodPair);
        // const $hr = $('<hr>');
        // $divS10.append($hr);

        $row.append($divS10);
        // end of table ******************************************



        const $divS2 = $("<div>").attr("class", "col s2");
        const $closeIcon = $("<i>").attr({
          id: "closeRecipe",
          class: "small material-icons right red-text"
        }).text("close").on('click', closeRecipe);
        const $liImg = $("<img>").attr({
          "src": beers[arrNum].image_url,
          "height": "200px",
          "width": "auto",
          "align": "center"
        });
        $("#mainFirstRow").append($closeIcon);
        $divS2.append($liImg);
        $row.append($divS2);

        $("#Recipe").append($row);
        const $hr = $('<hr>');
        $("#Recipe").append($hr);

        const $divS12 = $("<div>").attr("class", "col s12");
        const boilVolume = beers[arrNum].boil_volume;
        var volumeValue = (boilVolume.value);
        var volumeUnit = (boilVolume.unit);
        const $volume = $("<div>").text("Boil Volume: " + volumeValue + " " + volumeUnit).attr("class", " btmMarg");

        const $malt = $("<div>").text("Malts: ");
        const maltArr = beers[arrNum].malt;
        const $ulMalt = $("<ul>").attr("class", "malt");
        for (var i = 0; i < maltArr.length; i++) {
          var maltValue = (maltArr[i].amount.value);
          var maltUnit = (maltArr[i].amount.unit);
          var maltName = (maltArr[i].name);
          var maltDisc = (maltValue + " " + maltUnit + " " + maltName);
          $li = $("<li>").text(maltDisc);
          $ulMalt.append($li);
        }
        $malt.append($ulMalt);

        const mashTemp = beers[arrNum].method.mash_temp[0];
        // console.log(mashTemp);
        var mashDurat = (mashTemp.duration);
        // console.log(mashDurat);
        var mashC = (mashTemp.temp.value);
        // console.log(mashC);
        var mashUnit = (mashTemp.temp.unit);
        // console.log(mashUnit);
        const $mashDir = $("<div>").text("Mash Instructions: " + mashDurat + " minutes at " + mashC + " " + mashUnit).attr("class", " btmMarg");

        const $hopsStart = $("<div>").text("Hops (Start): ");
        const $hopsMiddle = $("<div>").text("Hops (Middle): ");
        const $hopsEnd = $("<div>").text("Hops (End): ");
        const $hopsDry = $("<div>").text("Hops (Dry Hopped): ");
        const hopsArr = beers[arrNum].hops;
        const $ulHopsStart = $("<ul>").attr("class", "hops_start");
        const $ulHopsMiddle = $("<ul>").attr("class", "hops_middle");
        const $ulHopsEnd = $("<ul>").attr("class", "hops_end");
        const $ulHopsDry = $("<ul>").attr("class", "hops_dry");
        for (var j = 0; j < hopsArr.length; j++) {
          var hopsValue = (hopsArr[j].amount.value);
          var hopsUnit = (hopsArr[j].amount.unit);
          var hopsName = (hopsArr[j].name);
          var hopsAttr = (hopsArr[j].attribute);
          var hopsDisc = (hopsValue + " " + hopsUnit + " " + hopsName + " (for " + hopsAttr + "): ");
          let $li = $("<li>").text(hopsDisc);
          if (hopsArr[j].add === "start") {
            $ulHopsStart.append($li);
          } else if (hopsArr[j].add === "middle") {
            $ulHopsMiddle.append($li);
          } else if (hopsArr[j].add === "end") {
            $ulHopsEnd.append($li);
          } else if (hopsArr[j].add === "dry hop") {
            $ulHopsDry.append($li);
          }

        }
        $hopsStart.append($ulHopsStart);
        $hopsMiddle.append($ulHopsMiddle);
        $hopsEnd.append($ulHopsEnd);
        $hopsDry.append($ulHopsDry);

        const yeast = beers[arrNum].ingrediants.yeast;
        const $yeast = $("<div>").text("Yeast: " + yeast).attr("class", " btmMarg");

        const ferment = beers[arrNum].method.fermentation.temp;
        // console.log(ferment);
        var fermValue = (ferment.value);
        // console.log(fermValue);
        var fermUnit = (ferment.unit);
        // console.log(fermUnit);
        const $fermDir = $("<div>").text("Fermentation Instructions: " + fermValue + " " + fermUnit).attr("class", " btmMarg");

        const tips = beers[arrNum].brewers_tips;
        const $brewTips = $("<div>").text("Brewers Tip's: " + tips).attr("class", " btmMarg");

        const twist = beers[arrNum].method.twist;
        const $twists = $("<div>").text("Twist: " + twist).attr("class", " btmMarg");

        const $foodPair = $("<div>").text("Food Pairing's: ");
        const pairs = beers[arrNum].food_pairing;
        const $ulPair = $("<ul>").attr("class", "tips");
        $("#foodPanel").empty();
        for (var k = 0; k < pairs.length; k++) {
          $li = $("<li>").text(pairs[k]);
          console.log(pairs[k]);
          var $pairsA = $("<a>").text(pairs[k]);
          var $pairsli = $("<li>").on('click', getRecipies.bind(null,pairs[k]));
          $pairsli.append($pairsA);
          $("#foodPanel").append($pairsli);
          $ulPair.append($li);
        }


        $foodPair.append($ulPair);

        const contBy = beers[arrNum].contributed_by;
        const $contBy = $("<div>").text("Contributed by: " + contBy);

        const firstBrew = beers[arrNum].first_brewed;
        // console.log(beers[arrNum]);
        // console.log(firstBrew);
        const $firstBrewed = $("<div>").text("First Brewed: " + firstBrew);

        $divS12.append($volume);
        $divS12.append($malt);
        $divS12.append($mashDir);
        $divS12.append($hopsStart);
        $divS12.append($hopsMiddle);
        $divS12.append($hopsEnd);
        $divS12.append($hopsDry);
        $divS12.append($yeast);
        $divS12.append($fermDir);
        $divS12.append($brewTips);
        $divS12.append($twists);
        $divS12.append($foodPair);
        $divS12.append($contBy);
        $divS12.append($firstBrewed);
        $("#Recipe").append($divS12);
        $("#Recipe").slideDown("slow");
      });

    });
  };
  // end render beers end ******************************************

  function closeRecipe() {
    $("#listings").slideDown("slow");
    $("#Recipe").slideUp("slow");
    setTimeout(emptyRecipie, 1000);
    $("#closeRecipe").remove();
  }

  function closeRecipeRt() {
    $(".results").slideUp("slow");
    $(".recipeDetail").slideDown("slow");
    setTimeout(emptyRecipieRt, 1000);
    $("#closeRecipeRt").remove();
  }

  function emptyRecipieRt() {
    $("#closeRecipeRt").empty();
  }

  function emptyRecipie() {
    $("#closeRecipe").empty();
  }



})();


// start recipie search

function getRecipies(recipes) {
  var $xhr = $.getJSON(`https://api.yummly.com/v1/api/recipes\?_app_id\=9f89f5e2\&_app_key\=921a70d39578f949768d9def2e6549c3\&q\=${recipes}\&requirePictures\=true`);
  $xhr.done(function(data) {
    if ($xhr.status !== 200) {
      return;
    }
    const newRecipies = [];
          for (var i=0 ; i<data.matches.length ; i++) {
            const newItem = {
              id: data.matches[i].id,
              img: data.matches[i].imageUrlsBySize[90],
              // ing: data.matches[i].ingredients,
              // rate: data.matches[i].rating,
              name: data.matches[i].recipeName,
              // source: data.matches[i].sourceDisplayName,
              // time: data.matches[i].totalTimeInSeconds
            };
            newRecipies.push(newItem);
    }
    recipies = newRecipies;
    // console.log(recipies);
    renderRecipies();
  });
  const renderRecipies = function () {
    $(".recipeDetail").slideUp();
    $(".results").empty();
    for (var i=0 ; i<recipies.length ; i++) {
      const $results = $(".results");
      const $div = $("<div>").attr({id: recipies[i].id, class: "col s6 minHeight"}).on('click', getRecipiesId.bind(null,recipies[i].id));
      var $img = $("<img>").attr("src", recipies[i].img);
      $div.append($img);
      var $name = $("<p>").text(recipies[i].name);
      $div.append($name);
      $results.append($div);
      }
    };

    const getRecipiesId = function(recipe) {
          var $xhr = $.getJSON(`http://api.yummly.com/v1/api/recipe/${recipe}?_app_id=9f89f5e2&_app_key=921a70d39578f949768d9def2e6549c3`);
          $xhr.done(function(data) {
            $(".recipeDetail").slideUp("slow");
            $(".results").slideUp("slow");
              if ($xhr.status !== 200) {
                  return;
              }
              $(".recipeDetail").empty();

                const newRecipe = {
                  img: data.images[0].hostedLargeUrl,
                  ing: data.ingredientLines,
                  name: data.name,
                  servings: data.numberOfServings,
                  prep: data.prepTime,
                  rate: data.rating,
                  sourceName: data.source.sourceDisplayName,
                  sourceUrl: data.source.sourceSiteUrl,
                  sourceLink: data.source.sourceRecipeUrl,
                  time: data.totalTime,
                  yeild: data.yield
                };

              recipe = newRecipe;

              const $closeIconRt = $("<i>").attr({
                id: "closeRecipeRt",
                class: "small material-icons right red-text"}).text("close").on('click', closeRecipeRt);

              const $rImg = $("<img>").attr("src", recipe.img);
              // console.log(recipe.img);
              const $rName = $("<h5>").text(recipe.name);
              // console.log(recipe.name);
              const $rRate = $("<span>").text("Rating: " + recipe.rate);
              // console.log(recipe.rate);
              const $rServ = $("<span>").text(" Servings: " + recipe.servings);
              // console.log(recipe.servings);
              const $rTime= $("<span>").text(" Time: " + recipe.time);
              // console.log(recipe.time);

              const $rIngred = $("<p>").text("Ingredients: ");
              const $ul = $("<ul>");
              for (var i=0 ; i<recipe.ing.length ; i++) {
                var $li = $("<li>").text(recipe.ing[i]);
                $ul.append($li);
              }
              $rIngred.append($ul);
              // console.log(recipe.ing);

              const $rSName = $("<p>").text("Source: " + recipe.sourceName);
              const $rSUrl = $("<p>").text("Website: " + recipe.sourceUrl);
              // console.log(recipe.sourceName);
              // console.log(recipe.sourceUrl);
              const $div = $("<div>");
              const $rLinkA = $("<span>").text("Get the recipe");
              const $rLinkB = $("<a>").text(" here ").attr({href: recipe.sourceLink, target: "_blank"});
              const $rLinkC = $("<span>").text("(this will open in a new window)");
              // console.log(recipe.sourceLink);

              $("#mainRtFirstRow").append($closeIconRt);

              $(".recipeDetail").append($rImg);
              $(".recipeDetail").append($rName);
              $(".recipeDetail").append($rRate);
              $(".recipeDetail").append($rServ);
              $(".recipeDetail").append($rTime);
              $(".recipeDetail").append($rIngred);
              $(".recipeDetail").append($rSName);
              $(".recipeDetail").append($rSUrl);
              $(".recipeDetail").append($div);
              $(".recipeDetail").append($rLinkA);
              $(".recipeDetail").append($rLinkB);
              $(".recipeDetail").append($rLinkC);

              $(".recipeDetail").slideDown("slow");

              // renderRecipeDetail();

              function closeRecipeRt() {
                $(".results").slideDown("slow");
                $(".recipeDetail").slideDown("slow");
                setTimeout(emptyRecipieRt, 1000);
                $("#closeRecipeRt").remove();
              }

              function emptyRecipieRt() {
                $("#closeRecipeRt").empty();
              }

          });
      };
}

function showBtn() {
  $(".Trident").toggleClass("hidden");
}

//.attr("style", "visibility: hidden")
//.style.visibility = "hidden"
// document.getElementById("myP").style.visibility = "hidden";
// function hideBtn showBtn {
//     something
// }
