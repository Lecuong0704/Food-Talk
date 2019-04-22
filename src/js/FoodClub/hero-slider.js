var q_banner, q_show, q_img, q_select, q_status;
var q_click = true, q_check_show_list = false; q_banner_show = false;
function q_banner_scrollable(select) {
    q_banner = $(select);
    q_scrollable();
    q_init_show();
    q_show_img();
}

function q_scrollable() {
    if (q_banner) {
        let x, left, down;
        $(q_banner).mousedown(function (e) {
            e.preventDefault();
            down = true;
            x = e.pageX;
            left = $(this).scrollLeft();
        });
        $(q_banner).mousemove(function (e) {
            if (down) {
                let newX = e.pageX;
                $(q_banner).scrollLeft(left - newX + x);
                q_click = false
            }
        });
        $(q_banner).mouseup(function (e) { down = false });
    }
}

function q_init_show() {
    q_show = $('#q_show');
    if (q_show.length == 0) {
        q_show = document.createElement('div');
        $('body').append(q_show);
        $(q_show).css({
            position: 'fixed',
            width: '100%',
            height: '100%',
            background: 'rgba(0,0,0,0.9)',
            'z-index': 100,
            top: '100%',
            opacity: 0
        })
        q_img = document.createElement('img');
        $(q_img).css({ position: 'absolute' });
        let close = document.createElement('div');
        let next = document.createElement('div');
        let pre = document.createElement('div');
        let list_image = document.createElement('div');
        let show_img = document.createElement('div');
        let q_bg = document.createElement('div');
        q_add_img(list_image);
        q_status = document.createElement('div');
        $(q_status).css({
            position: 'absolute',
            left: '10px',
            top: '10px',
            color: '#fff',
            'font-family': 'Arial, Helvetica, sans-serif'
        })
        $(list_image).css({
            top: 0,
            position: 'absolute',
            height: '100%',
            width: '20%',
            left: '100%',
            background: '#fff',
            'overflow-y': 'auto'
        }).addClass('q_list_img_banner')
        $(close).css({
            position: 'absolute',
            right: '10px',
            top: '10px',
            color: '#ccc',
            'font-weight': 'bold',
            cursor: 'pointer',
            background: '#000',
            padding: '10px 20px',
            'font-family': 'Arial, Helvetica, sans-serif'
        }).text('x').click(() => {
            $(q_show).animate({ opacity: 0 }, 500, () => {
                $(q_show).css({
                    top: '100%',
                })
            })
            q_banner_show = false;
        });
        $(show_img).css({
            position: 'absolute',
            right: '60px',
            top: '10px',
            'font-weight': 'bold',
            cursor: 'pointer',
            background: '#000',
            padding: '10px 20px',
            'font-family': 'Arial, Helvetica, sans-serif'
        }).html(`<i style="padding: 0 8px; background: #ccc; border-radius: 5px"></i>`).click(() => {
            if (q_check_show_list) {
                $(list_image).animate({ 'left': '100%' }, 500);
                $(main).animate({ 'width': '100%' }, 500);
            }
            else {
                $(list_image).animate({ 'left': '80%' }, 500);
                $(main).animate({ 'width': '80%' }, 500);
            }
            q_check_show_list = !q_check_show_list
        });
        $(next).css({
            position: 'absolute',
            right: '10px',
            top: '45%',
            color: '#fff',
            'font-weight': 'bold',
            cursor: 'pointer',
            background: '#000',
            padding: '10px',
            'font-family': 'Arial, Helvetica, sans-serif'
        }).html('<i class="fa fa-angle-right fa-4x"></i>').click(() => {
            q_select_img(q_select + 1)
        });
        $(pre).css({
            position: 'absolute',
            left: '10px',
            top: '45%',
            color: '#fff',
            'font-weight': 'bold',
            cursor: 'pointer',
            background: '#000',
            padding: '10px',
            'font-family': 'Arial, Helvetica, sans-serif'
        }).html('<i class="fa fa-angle-left fa-4x"></i>').click(() => {
            q_select_img(q_select - 1)
        });
        let main = document.createElement('div');
        $(q_bg).css({
            'position': 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
        }).click(()=>{
            $(q_show).animate({ opacity: 0 }, 500, () => {
                $(q_show).css({
                    top: '100%',
                })
            })
            q_banner_show = false;
        })
        $(main).css({
            'position': 'relative',
            width: '100%',
            height: '100%'
        }).append(close).append(q_img).append(next).append(pre).append(q_status).append(show_img);
        $(q_show).append(main).append(list_image);
    }
}
function q_show_img() {
    if (q_banner) {
        $(q_banner).find('img').each((i, e) => {
            $(e).click(() => {
                if (q_click)
                    q_select_img(i,500);
                q_click = true
            })
        })
    }
}
function q_select_img(i, animate = 0, list = false) {
    let img = $(q_banner).find('img')[i];
    if (img) {
        $(q_status).text(`${i + 1}/${$(q_banner).find('img').length}`)
        q_select = i
        $(q_img).attr('src', $(img).attr('src')).css({
            top: list?$(window).height() / 2 - $(img).height() / 2:$(img).position().top - $(window).scrollTop(),
            left: list?'100%':$(img).position().left,
            width: $(img).width(),
            height: $(img).height(),
        });
        $(q_img).animate({
            top: $(window).height() / 2 - $(img).height() / 2,
            left: $(window).width() / 2 - $(img).width() / 2 - (q_check_show_list ? $(window).width() / 10 : 0),
        }, animate);
        $(q_show).css({ top: 0 }).animate({ opacity: 1 }, 500)
        q_banner_show = true;
    }
}
function q_add_img(list_img) {
    $(q_banner).find('img').each((i, e) => {
        let img = document.createElement('img');
        $(img).attr('src', $(e).attr('src')).css({
            width: '100%',
            cursor: 'pointer',
        }).click(() => {
            q_select_img(i,500,true);
        });
        $(list_img).append(img);
    })
}
$(window).keydown(function(e) {
    if(e.key === 'ArrowRight' && q_banner_show){
        q_select_img(q_select + 1)
    }
    if(e.key === 'ArrowLeft' && q_banner_show){
        q_select_img(q_select - 1)
    }
});
