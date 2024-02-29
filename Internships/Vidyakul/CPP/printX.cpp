#include <iostream>
using namespace std;

void printX (int n)

{
    char X[n][n];
    
    for (int i = 0; i < n; i++)

    {
        for (int j = 0; j < n; j++)

        {
            if (i == j || i + j == n - 1)

            {
                X[i][j] = '*';
            }

            else

            {
                X[i][j] = ' ';
            }
        }
    }

    for (int i = 0; i < n; i++)

    {
        for (int j = 0; j < n; j++)

        {
            cout << X[i][j] << " ";
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

    printX(n);

    return 0;
}