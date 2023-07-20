#!/bin/ksh
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
cd /home/hydrology/scripts/svs_sel
cp vs_All.geojson vs_Last.geojson
dat1=`date +%Y-%m-%d`
file=`echo download/$dat1.zip`
dat2=`more anomalia_estacoes.txt | awk '{print $2}' | sort | tail -1`
if [ ! -f "$file" ]; then
cd download/
rm -f *.zip
wget "https://hydroweb.theia-land.fr/hydroweb/authdownload?products=rivers_operational&format=txt&sdate=$dat2&edate=$dat1&user=daniel.moreira@cprm.gov.br&pwd=#D4ni31198o" -O $dat1.zip
file1=`find "$dat1.zip" -size +900k`
if [ -n "$file1" ]; then
unzip $dat1.zip
cd ..
rm -f anomalia_estacoes.txt
list=`ls hydroprd_R_*.txt`
for i in $list; do
nan=`echo $i | awk '{print substr($1, 1, length($1)-4)}'`
file1=`echo "_from_"$dat2"_to_"$dat1".txt" | sed 's/-//g'`
file2=`echo "download/"$nan$file1`
if test -f "$file2"; then
awk 'NF && $1!~/^#/' $file2 > tempo
cat $i tempo > tempo2
sort -u tempo2 | awk 'NF' > $i
awk 'NF && $1!~/^#/' $i | grep -e "2023" | awk '{print $1"T"$2,$3}' > 2023_$i
fi
valor=`tail -1 $i | awk '{print $3}'`
dat=`tail -1 $i | awk '{print $1}'` 
ano=`grep -e "$dat" men_"$i" | awk -v v1="$valor" '{printf "%4.1f\n", v1-$2}'`
pen=`tail -2 $i | head -1 | awk -v v1="$valor" '{printf "%4.1f\n", v1-$3}'`
echo $i $dat $ano $valor $pen >> anomalia_estacoes.txt
done
join -a 1 -a 2 stations_list.txt anomalia_estacoes.txt > tempo
more tempo | sed 's/hydroprd_//g' | sed 's/.txt//g' | sed 's/ /,/g' > tempo2
cat cabeca.csv tempo2 > sv.csv
ogr2ogr -f "GeoJSON" vs_All.geojson sv.vrt
grep J2 tempo2 > tempo3
cat cabeca.csv tempo3 > sv.csv
ogr2ogr -f "GeoJSON" vs_J2.geojson sv.vrt
grep J3 tempo2 > tempo3
cat cabeca.csv tempo3 > sv.csv
ogr2ogr -f "GeoJSON" vs_J3.geojson sv.vrt
grep S3A tempo2 > tempo3
cat cabeca.csv tempo3 > sv.csv
ogr2ogr -f "GeoJSON" vs_S3A.geojson sv.vrt
grep S3B tempo2 > tempo3
cat cabeca.csv tempo3 > sv.csv
ogr2ogr -f "GeoJSON" vs_S3B.geojson sv.vrt
grep S6A tempo2 > tempo3
cat cabeca.csv tempo3 > sv.csv
ogr2ogr -f "GeoJSON" vs_S6A.geojson sv.vrt
cp vs_*.geojson /home/hydrology/www/public_html/assets/data/geojson/
rm -f sv.csv tempo*
rm -f download/*.txt
fi
fi
