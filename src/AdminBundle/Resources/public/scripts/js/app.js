console.time('appAll');

var Article = React.createClass({
    propTypes:	{
        data:	React.PropTypes.shape({
            author:	React.PropTypes.string.isRequired,
            text:	React.PropTypes.string.isRequired
        })
    },
    render:	function()	{
        var	data = this.props.data;

        return	(
            <div	className="article">
            <p	className="news__author">{data.author}:</p>
            <p	className="news__text">{data.text}</p>
            </div>
        )
    }
});

var	News = React.createClass({
    propTypes:	{
        data: React.PropTypes.array.isRequired
    },
    render:	function()	{
        var	data = this.props.data;

        // data = [];

        var	newsTemplate = data.length ? data.map(function(item,	index)	{
            return	(
                <div key={index}>
                    <Article data={item} />
                </div>
            );
        }) : <p>К сожалению новостей нет</p>;

        return (
            <div className="news">
            <strong	className={data.length	>	0	?	'':'none'}>Всего	новостей:	{data.length}</strong><br />
                {newsTemplate}
            </div>
        );
    }
});

var comment = {
    desc: "Хреновые сегодня новости!"
};

var	myNews	=	[
    {
        author:	'Саша Печкин',
        text:	'В	четверг,	четвертого	числа...'
    },
    {
        author:	'Просто	Вася',
        text:	'Считаю, что $ должен стоить 35	рублей!'
    },
    {
        author:	'Гость',
        text:	'Бесплатно.	Скачать. Лучший	сайт - http://localhost:3000'
    }
];

var	App	= React.createClass({
    render:	function()	{
        return (
            <div className="news-page"> {/* JSX	- стиль */}
            <h3>Новости</h3>
        <News data={myNews}/>
        </div>
        );
    }
});

console.time('app');

ReactDOM.render(
    <App />,
    document.getElementById('content')
);


console.timeEnd('appAll');
console.timeEnd('app');

// 41 стр.
