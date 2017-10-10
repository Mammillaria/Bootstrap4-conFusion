'use strict'

module.exports=function(grunt){

	require('time-grunt')(grunt);
	require('jit-grunt')(grunt, {
		useminPrepare: 'grunt-usemin'
	});

	grunt.initConfig({
		sass:{
			dist:{
				files:{
					'css/styles.css':'css/styles.scss'
				}
			}
		},

		watch: {
			files: 'css/*.scss',
			tasks: ['sass']
		},

		browserSync: {
			dev:{
				bsFiles:{
					src: [
						'css/*.css',
						'*.html',
						'js/*.js'
					]
				},

				options: {
					watchTask: true,
					server:{
						baseDir: './'
					}
				}
			}
		},

		copy: {
			html: {
				files: [{
					//for html
					expand: true, 
					dot: true,
					cwd: './',
					src: ['*.html'],
					dest: 'dist'
				}]
			},

			fonts: {
				files:[{
					//for font-awesome
					expand: true, 
					dot: true, 
					cwd: 'node_modules/font-awesome',
					src: ['fonts/*.*'],
					dest: 'dist'
				}]
			}
		},

		clean: {
			build: {
				src: ['dist/']
			}
		}, 

		imagemin: {
			dynamic: {
				files:[{
					expand: true, //Enable dynamic expansion
					cwd: './',    //Src matches are relative to this path
					src: ['img/*.{png, gif, jpg}'], //Actual patterns to match
					dest: 'dist/' //destination path prefix
				}]
			}
		},

		useminPrepare: {
			foo: {
				dest: 'dist',
				src: ['contactus.html', 'aboutus.html', 'index.html']
			},
			options: {
				flow: {
					steps: {
						css: ['cssmin'], 
						js: ['uglify']
					},
					post: {
						css: [{
							name: 'cssmin', 
							createConfig: function(context, block){
								var generated = context.options.generated;
								generated.options = {
									keepSpecialComments: 0,
									rebase: false
								};
							}
						}]
					}
				}
			}
		},

		//Concat
		concat: {
			options: {
				separator: ';'
			},
			//dist configuration is provided by useminPrepare
			dist: {}
		}, 

		//Uglify
		uglify: {
			//dist configuration is provided by useminPrepare
			dist: {}
		},

		cssmin: {
			dist:{}
		},

		//Filerev
		filerev:{
			options: {
				encoding: 'utf8',
				algorithm: 'md5',
				lenght:20
			},

			release: {
				files:[{
					src: ['dist/css/*.css', 'dist/js/*.js']
				}]
			}
		},

		usemin: {
			html: ['dist/contactus.html', 'dist/aboutus.html', 'dist/index.html'],
			options: {
				assetsDirs: ['dist', 'dist/css', 'dist/js']
			}
		}

	})
	grunt.registerTask('css', ['sass']);
	grunt.registerTask('default', ['browserSync', 'watch']);
	grunt.registerTask('build', [
		'clean',
		'copy',
		'imagemin',
		'useminPrepare',
		'concat',
		'cssmin',
		'uglify',
		'filerev',
		'usemin'
		]);
}