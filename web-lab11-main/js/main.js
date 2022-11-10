
$(function (){
    $(document).ready(function(){
        $.ajax({
            type: 'GET',
            url: 'php/session_load.php',
            dataType: "html",
            success: function(data){
                $("#result-table").prepend(data);
            }, error: function(error,data) {
                console.log('Error:', data);
            }
        }).done(function(data) {
            console.log(data);
        })
    })

    let x_value_validate = false;
    let y_value_validate = false;
    let r_value_validate = false;
    let x_value = null;
    let y_value = null;
    let r_value = null;

    function checkNum(n){
        return !isNaN( parseFloat(n) && isFinite(n))
    }

    function checkRange(min,max,num){
        if(checkNum(num)){
            return num >= min && max >= num
        }
        else{
            return false;
        }
    }

    function validateForm(){
        return x_value_validate && y_value_validate && r_value_validate
    }

    $('.clear-btn').click(function(){
        $("#table-body").empty();
        $.ajax({
            type: 'GET',
            url: 'php/session_clear.php',
            success: function(data){
                $("#result-table").append(data);
            }, error: function(error,data) {
                console.log('Error:', data);
            }
        }).done(function(data) {
            console.log(data);
        })
    })

    $('.x-btn').click(function (){
        if($(this).attr('data-selected') === 'true'){
            $(this).attr('data-selected','false');
            $(this).removeClass('selected-btn');
            x_value = null;
            x_value_validate = false;
        }
        else{
            $(this).closest('div.x_values').find('.x-btn').not(this)
                .removeClass('selected-btn').attr('data-selected','false');
            $(this).attr('data-selected','true');
            $(this).addClass('selected-btn');
            if(checkNum($(this).val())){
                x_value = $(this).val();
                x_value_validate = true;
            }else{
                x_value = null;
                x_value_validate = false;
                console.log(x_value);
            }
        }

    });

    $("#y-value").on('input',function(){
        const input = $(this);
        const is_Num = checkRange(-3, 5, input.val().replace(',','.'));
        if(is_Num){
            input.removeClass("invalid-input").addClass('valid-input')
            y_value = $(this).val();
            y_value_validate = true;
        }
        else{
            input.removeClass('valid-input').addClass('invalid-input')
            y_value_validate = false;
            y_value = null;
        }

    })

    $("#r-value").on('input',function(){
        const input = $(this);
        const is_Num = checkRange(2, 5, input.val().replace(',','.'));
        if(is_Num){
            input.removeClass("invalid-input").addClass('valid-input')
            r_value = $(this).val();
            r_value_validate = true;
        }
        else{
            input.removeClass('valid-input').addClass('invalid-input');
            r_value_validate = false;
            r_value = null;
        }
    })

    $('#input-form').submit(function(event){
        if(validateForm()){
            $('#error').empty();
            const formData = {
                xVal: x_value,
                yVal: y_value.replace(',', '.'),
                rVal: r_value.replace(',', '.'),
                timezone: new Date().getTimezoneOffset(),
            };
            $.ajax({
                type: 'GET',
                url: 'php/main.php',
                data: formData,
                dataType: "json",
                success: function (data){
                    $('.check_button').attr('disabled',false);
                    let newRow;
                    if(data[6]){
                        newRow = '<tr>';
                        newRow += '<td>' +data[0] + '</td>';
                        newRow += '<td>' +data[1] + '</td>';
                        newRow += '<td>' +data[2] + '</td>';
                        newRow += '<td>' +data[3] + '</td>';
                        newRow += '<td>' +data[4] + '</td>';
                        if(data[5]){
                            newRow += '<td class="true">' +data[5] + '</td>';
                        }else{
                            newRow += '<td class="false">' +data[5] + '</td>';
                        }
                        newRow += '</tr>';
                        $("#result-table").prepend(newRow);
                    }
                },
                error: function(jqxhr,status,exception) {
                    alert(exception);
                }
            }).done(function(data){
                console.log(data);
            })
        }
        else{
            $('#error').text("Please fill in all required fields correctly!")
        }
        event.preventDefault();
    })
});


