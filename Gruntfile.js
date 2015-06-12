
module.exports = function(grunt) {

  var gh_pages = { config: grunt.file.readYAML('gh-pages/_config.yml') };

  grunt.initConfig({

    'copy': {
      'main': {
        expand: true, 
        cwd: 'kr/',
        src: ['*.md', '!documentation.md'],
        dest: 'gh-pages/docs/',
      },
    },
    'gh-pages': {
      options: { 
      	base: 'gh-pages',
		repo: 'https://github.com/xpressengine/laravel-korean-docs.git'
	  },
      src: ['**/*']
    },
    'build': {
      kr_docs: {
        src: 'gh-pages/docs/*'
      },
      options: { 
        permalink_prefix : '/docs/5.0/'
      }
    }
  });

  grunt.registerMultiTask('build', 'build gh-pages for jeykll', function () {

        var options = this.options({
          permalink_prefix: /docs/,
        });

        this.files.forEach(function (files) {

            files.src.forEach(function(file) {

              var  content = grunt.file.read(file),
                firstLine = content.split('\n')[0].replace("# ", ""),
                filename = file.replace(/^.*[\\\/]/, '').replace(/.[^.]+$/,''),
                prepend = '',
                append = '';

                if(content.charAt(0) !== '#') return;
            
                prepend = '---\n';
                prepend += 'layout: default\n';
                prepend += 'title: "' + firstLine + '"\n';
                prepend += 'permalink: ' + options.permalink_prefix + filename + '/\n';
                prepend += '---\n\n';

                // replace regex
                content = content.replace(/([\{|\}]{2,})/g, '{% raw %}$1{% endraw %}');
                content = content.replace(/\((\/docs\/)/g, '(' + gh_pages.config.baseurl + '$1');

                content = content.replace(/<!--chak-comment-(.+)-->/g, '<div class="chak-comment-wrap"><div class="chak-comment-widget" data-apikey="coe00da03b685a0dd18fb6a08af0923de0-laravel-korean-docs-$1" ><i class="xi-message"></i> <strong>클릭</strong>하여 의견을 공유할 수 있습니다. ( 총 <span class="count"><i class="xi-spinner-5 xi-spin"></i></span>개의 의견이 있습니다. )</div></div>');
                
                // save file
                grunt.file.write( file, [prepend, content, append].join('') );
            });

        });
    });

    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', [ 'copy', 'build']);
    grunt.registerTask('deploy', ['gh-pages']);
};
