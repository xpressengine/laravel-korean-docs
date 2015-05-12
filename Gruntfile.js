
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
      options: { base: 'gh-pages' },
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
