require([
    'gitbook',
    'jquery'
], function(gitbook, $) {
    // need a collection
    const uniq = function(arr) {
        return arr.reduce(function(collection, item){
            if (collection.indexOf(item) < 0) {
                collection.push(item);
            }
            return collection;
        }, [])
    }
    const PDMS = ['telamon'];
    const MODEL_IDE = ['ultron', 'app-wizard'];
    const APP_IDE = ['ultron', 'app-wizard'];
    const APP_CENTER = ['appcenter'];
    const MODEL_CENTER = ['model-center'];
    const HYPERCYCLE_CV = ['autocv-backend', 'autocv-image-forecast<'];
    const HYPERCYCLE_ML = ['engine-manager', 'sc-self-learner'];
    const MIDDLEWARE = ['master-service', 'pms', 'pas'];
    const MANAGER_PLATFORM = ['manager', 'config-center', 'keystone', 'license-manager'];
    const NEW_WORD = uniq([...PDMS, ...MODEL_IDE, ...APP_IDE, ...APP_CENTER, ...MIDDLEWARE]);
    const BEST_PRACTICE = uniq([...PDMS, ...MODEL_IDE, ...APP_IDE, ...APP_CENTER, 'rtidb-console', ...APP_CENTER]);
    const DEVELOPER_DOCUMENT = uniq([...PDMS, 'pms']);
    const GETSTARTED = uniq([...MANAGER_PLATFORM, ...PDMS, ...MODEL_IDE, ...APP_IDE, ...APP_CENTER]);

    const MODULES_MAP = {
        'getstarted': GETSTARTED,
        'pdms': PDMS,
        'modelide': MODEL_IDE,
        'appide': APP_IDE,
        'modelcenter': MODEL_CENTER,
        'appcenter': APP_CENTER,
        'manage platform': MANAGER_PLATFORM,
        'HyperCycle CV': HYPERCYCLE_CV,
        'HyperCycle ML': HYPERCYCLE_ML,
        'middleware': MIDDLEWARE,
        'manage platform': MANAGER_PLATFORM,
        'new word': NEW_WORD,
        'best practice': BEST_PRACTICE,
        'developer document': DEVELOPER_DOCUMENT
    }
    // var host = window.host;
    // var host = 'http://gateway.360aio.autoui.4pd.io';
    $('body').append()

    var host = 'http://gateway.360cdh.autoui.4pd.io';
    $.get(`${host}/config-center/v1/versions`, function(data) {
        var response = data.data || {};
        // var configs = response.map(function(res) {return res.key});
        var configs = ['ultron', 'app-wizard'];
        var paths = [];
        const hasModule = function (moduleConfigs, configs) {
            return moduleConfigs.map(function(mConfig) {
                return configs.indexOf(mConfig) >= 0
            }).every(function(item) {
                return item;
            })
        }
        for(var module in MODULES_MAP) {
            var requiredConfigs = MODULES_MAP[module];
            if (hasModule(requiredConfigs, configs)) {
                paths.push(module);
            }
        }
        $("ul.summary").children("li.chapter").each(function(i){

            var path = $(this).attr("data-path").match(/(.*?)[\w\d\.]*/g)
                .filter(function(v) {
                    return !(/^[.]*$/.test(v))
                })[0];
            if (path && paths.indexOf(path.toLowerCase()) < 0) {
                $(this).hide();
            }
        })
        
    })
    .fail(function() {

        $('.book').hide();
        $('body').append('<div style="margin: auto; width: 200px; padding: 200px; font-size:200px">404 Not Found</div>')
    });

})