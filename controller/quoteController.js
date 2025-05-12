$(function(){

    function validateQuote(license_plate, name, last_name, date_birth){

        let plateRegex = /^[A-Z]{3}[0-9]{3}$/;
        
        if (!plateRegex.test(license_plate)) {
            alert("La placa debe tener el formato DFG123: 3 letras mayúsculas y 3 números.");
            return false;
        } 
        
        if ((!name) || (!last_name) || (!date_birth)){
            alert("Los campos con * son obligatios.");
            return false
        }

        return true;
    }

    $("#quote").on("click",function(){

        let license_plate = $("#license_plate").val();
        let name = $("#name").val();
        let last_name = $("#last_name").val();
        let date_birth = $("#date_birth").val();

        let method = "POST";
        let url = "http://serversga.com:38/api/cotizar";
        let dataType = "json";
        let contentType = "application/json";

        let data =  { 
            "name": name,
            "last_name": last_name,
            "date_birth": date_birth,
            "license_plate": license_plate
        };

        if (validateQuote(license_plate, name, last_name, date_birth)){

            $.ajax({

                url: url,
                type: method,
                contentType: contentType,
                dataType: dataType,
                data: JSON.stringify(data),
                success: function (response) {
                    showQuotes(response);
                    console.log(response);
                }
            });

        }
    });

    function showQuotes(offers) {
        
        let htmlTable = `<table class="table border mt-5">
                            <thead>
                                <tr>
                                    <th scope="col"># Cotizacion</th>
                                    <th scope="col">Placa</th>
                                    <th scope="col">Producto</th>
                                    <th scope="col">Valor</th>
                                </tr>
                            </thead>
                        <tbody>`;
    
        $.each(offers, function (i, item) {

        htmlTable +=`<tr>
                    <th scope="row">${item.noCotizacion}</th>
                    <td>${item.placa}</td>
                    <td>${item.nombreProducto}</td>
                    <td>${item.valor}</td>
                </tr>`;
        });
    
        htmlTable += '</tbody></table>';
    
        $('#quoteWithOffers').html(htmlTable);
        
    }

});