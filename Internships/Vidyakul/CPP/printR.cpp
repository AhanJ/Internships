#include <iostream>
using namespace std;

void printR (int n)

{
    int w = n + 1;
    int h = 2 * n;

    int m = n - 1;

    char R[h][w];
    
    for (int i = 0; i < h; i++)

    {
        for (int j = 0; j < w; j++)

        {
            if (j == 0 || i == 0 || i == m || (j == w - 1) && (i <= m) || (i - j == m))

            {
                R[i][j] = '*';
            }
            
            else 

            {
                R[i][j] = ' ';
            }
        }
    }

    for (int i = 0; i < h; i++)

    {
        for (int j = 0; j < w; j++)

        {
            cout << R[i][j] << " ";
        }

        cout << endl;
    }
}

int main()

{
    int n;

    cout << "Enter the Height of the Letter: ";
    cin >> n;

    cout << endl;

    printR(n);

    return 0;
}