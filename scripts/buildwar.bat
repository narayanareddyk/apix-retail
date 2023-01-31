echo "%~dp0"

cd..

echo "%CD%"

echo "Removing war..."
del demo-apixRetail.war

echo "Building application..."
echo "npm run build -- --profile"

cd build/

echo "Building war..."
jar cvf ../demo-apixRetail.war *

cd ../

echo "%CD%"

echo "Removing build folder..."
RMDIR build /S /Q

echo "Build completed."