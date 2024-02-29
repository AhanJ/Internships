#include <iostream>
using namespace std;

void printH (int n)

{
    char A[n][2 * n]; // [n][n]
    int start,end,i,j,k,mid;

    for(i = 0; i < n; i++)

    {
        for (j = 0; j < 2 * n; j++)

        {
            if (j == 0 || j == (2 * n - 1)) // j == n - 1
            
            {
                A[i][j] = '*';
            }

            else if (i == n / 2)

            {
                A[i][j] = '*';
            }

            else

            {
                A[i][j] = ' ';
            }
        }
    }

    for(i = 0; i < n; i++)

    {
        for (j = 0; j < 2 * n; j++)

        {
            cout << A[i][j];
        }

        cout << endl;
    }
}

int main()

{
    int n;
    
    cout << "Enter the Height of the Letters: ";
    cin >> n;

    cout << endl;

    printH(n);
}