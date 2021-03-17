/**
 * Created by Lukas Fridl on 11.11.2015.
 */

var progressElements = [];
function findById(source, id) {
    for (var i = 0; i < source.length; i++) {
        if (source[i].id === id) {
            return source[i];
        }
    }
    return false;
}
$.fn.progressOnMouseOver = function(){
    this.mouseenter(function () {
        if (!findById(progressElements, this.id)) {
            var progressElement = new Progress(this.id);
            progressElements.push(progressElement);
            progressElement.progress('plus')
        } else {
            var progressElement = findById(progressElements, this.id);
            progressElement.progress('plus');
        }
    }).mouseleave(function () {
        var progressElement = findById(progressElements, this.id);
        progressElement.progress('minus');
    });
}

function Progress(id) {
    this.id = id;
    var timeOut = 0;
    var width = 0;
    this.progress = function (type) {
        var id = this.id;
        clearTimeout(timeOut);
        if (type == 'plus') {
            (function animate() {
                timeOut = setTimeout(function () {
                    width++;
                    $('#' + id).find('.progress').attr('style', 'width: ' + width + '%;');
                    animate();
                    if (width == 100) {
                        clearTimeout(timeOut);
                    }
                }, 2);
            }());
        }

        if (type == 'minus') {
            (function animate() {
                timeOut = setTimeout(function () {
                    width--;
                    $('#' + id).find('.progress').attr('style', 'width: ' + width + '%;');
                    animate();
                    if (width == 0) {
                        clearTimeout(timeOut);
                    }
                }, 2);
            }());
        }
    }
}
