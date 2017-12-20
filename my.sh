#hexo clean
#hexo d -g
cd ../chuhang123.github.io/
rm -rf blog/source/
cd .. 
ls
cd blog/
ls
cp -r source/ ../chuhang123.github.io/blog/source/
cd ..
cd chuhang123.github.io/blog/
git checkout chuhang
git add .
git commit -m 'complete'
git push

